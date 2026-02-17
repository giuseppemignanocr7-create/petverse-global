import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/modules/auth/auth.service';
import { PrismaService } from '../src/database/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const dto = {
        fullName: 'Mario Rossi',
        email: 'mario@example.com',
        password: 'Password123!',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: 'user-1',
        email: dto.email,
        fullName: dto.fullName,
        passwordHash: 'hashed',
        emailVerified: false,
        createdAt: new Date(),
      });
      mockJwtService.signAsync
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');

      const result = await service.register(dto);

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(dto.email);
      expect(result.accessToken).toBe('access-token');
      expect(result.refreshToken).toBe('refresh-token');
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'existing-user',
        email: 'mario@example.com',
      });

      await expect(
        service.register({
          fullName: 'Mario',
          email: 'mario@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 12);

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'mario@example.com',
        fullName: 'Mario Rossi',
        passwordHash: hashedPassword,
        deletedAt: null,
        createdAt: new Date(),
      });
      mockPrisma.user.update.mockResolvedValue({});
      mockJwtService.signAsync
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');

      const result = await service.login({
        email: 'mario@example.com',
        password: 'Password123!',
      });

      expect(result.user).toBeDefined();
      expect(result.accessToken).toBe('access-token');
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const hashedPassword = await bcrypt.hash('CorrectPassword123!', 12);

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'mario@example.com',
        passwordHash: hashedPassword,
        deletedAt: null,
      });

      await expect(
        service.login({
          email: 'mario@example.com',
          password: 'WrongPassword123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for non-existent user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'nonexistent@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for deleted user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'mario@example.com',
        passwordHash: 'hash',
        deletedAt: new Date(),
      });

      await expect(
        service.login({
          email: 'mario@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const currentHash = await bcrypt.hash('OldPassword123!', 12);

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        passwordHash: currentHash,
      });
      mockPrisma.user.update.mockResolvedValue({});

      const result = await service.changePassword('user-1', {
        currentPassword: 'OldPassword123!',
        newPassword: 'NewPassword123!',
      });

      expect(result.message).toBe('Password changed successfully');
      expect(mockPrisma.user.update).toHaveBeenCalled();
    });

    it('should throw for incorrect current password', async () => {
      const currentHash = await bcrypt.hash('CorrectPassword!', 12);

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        passwordHash: currentHash,
      });

      await expect(
        service.changePassword('user-1', {
          currentPassword: 'WrongPassword!',
          newPassword: 'NewPassword123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
