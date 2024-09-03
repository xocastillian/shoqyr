import { Role } from '@prisma/client'
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsDateString,
  MinLength,
  isEnum,
  IsEnum,
} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string

  @IsOptional()
  @IsDateString()
  registrationDate?: Date

  @IsOptional()
  @IsEnum(Role)
  role?: Role
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string

  @IsOptional()
  @IsDateString()
  registrationDate?: Date

  @IsOptional()
  @IsEnum(Role)
  role?: Role
}
