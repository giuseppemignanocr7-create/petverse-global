import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Species {
  DOG = 'dog',
  CAT = 'cat',
  BIRD = 'bird',
  RABBIT = 'rabbit',
  HAMSTER = 'hamster',
  FISH = 'fish',
  REPTILE = 'reptile',
  OTHER = 'other',
}

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
}

export class CreatePetDto {
  @ApiProperty({ example: 'Luna' })
  @IsString()
  name: string;

  @ApiProperty({ enum: Species, example: Species.DOG })
  @IsEnum(Species)
  species: Species;

  @ApiProperty({ required: false, example: 'Labrador Retriever' })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  breedCategory?: string;

  @ApiProperty({ enum: Sex, required: false })
  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  estimatedAgeMonths?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  microchipNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pedigreeNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  initialWeight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  heightCm?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coatColor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coatType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  distinctiveMarks?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  insuranceProvider?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  insurancePolicyNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  insuranceExpiry?: string;

  avatar?: any;
}

export class UpdatePetDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  breedCategory?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  estimatedAgeMonths?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  microchipNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coatColor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coatType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  distinctiveMarks?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  avatar?: any;
}
