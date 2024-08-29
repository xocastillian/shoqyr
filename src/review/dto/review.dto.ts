import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator'

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number

  @IsOptional()
  @IsString()
  comment?: string

  @IsNotEmpty()
  @IsInt()
  productId: number

  @IsNotEmpty()
  @IsInt()
  userId: number
}

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number

  @IsOptional()
  @IsString()
  comment?: string

  @IsOptional()
  @IsInt()
  productId?: number

  @IsOptional()
  @IsInt()
  userId?: number
}
