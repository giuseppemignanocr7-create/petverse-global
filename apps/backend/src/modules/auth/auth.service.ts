import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import {
  LoginDto,
  GoogleLoginDto,
  AppleLoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from './dto/login.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        fullName: dto.fullName,
        emailVerified: false,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('Account has been deactivated');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async loginWithGoogle(dto: GoogleLoginDto) {
    // In production: verify Google ID token with Firebase Admin SDK
    // For now, we'll create a stub that would be replaced with actual verification
    throw new BadRequestException('Google login requires Firebase Admin SDK configuration');
  }

  async loginWithApple(dto: AppleLoginDto) {
    // In production: verify Apple identity token
    throw new BadRequestException('Apple login requires Apple Developer configuration');
  }

  async logout(userId: string) {
    // In production: invalidate refresh token in Redis
    return { message: 'Logged out successfully' };
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if email exists
      return { message: 'If the email exists, a reset link has been sent' };
    }

    // In production: generate reset token, store in Redis with TTL, send email
    const resetToken = uuidv4();
    // await this.redisService.set(`reset:${resetToken}`, user.id, 3600);
    // await this.mailService.sendPasswordReset(user.email, resetToken);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // In production: verify token from Redis
    // const userId = await this.redisService.get(`reset:${dto.token}`);
    // if (!userId) throw new BadRequestException('Invalid or expired token');

    throw new BadRequestException('Password reset requires Redis configuration');
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.passwordHash) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    return { message: 'Password changed successfully' };
  }

  async verifyEmail(token: string) {
    // In production: verify token from Redis/DB
    throw new BadRequestException('Email verification requires token configuration');
  }

  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { message: 'If the email exists, a verification link has been sent' };
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    // In production: generate and send verification email
    return { message: 'Verification email sent' };
  }

  private async generateTokens(userId: string, email: string) {
    const payload: JwtPayload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '30d'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: any) {
    const { passwordHash, deletedAt, ...sanitized } = user;
    return sanitized;
  }
}
