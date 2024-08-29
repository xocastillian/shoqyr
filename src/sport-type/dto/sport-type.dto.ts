import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSportTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string
}

export class UpdateSportTypeDto {
  @IsOptional()
  @IsString()
  name?: string
}
