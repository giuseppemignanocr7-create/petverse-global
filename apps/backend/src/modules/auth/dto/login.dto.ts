import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'mario@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class GoogleLoginDto {
  @ApiProperty()
  @IsString()
  idToken: string;
}

export class AppleLoginDto {
  @ApiProperty()
  @IsString()
  identityToken: string;

  @ApiProperty({ required: false })
  @IsString()
  fullName?: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'mario@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  currentPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
