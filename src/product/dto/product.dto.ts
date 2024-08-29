import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsNumber()
  stock: number

  @IsOptional()
  @IsUrl()
  imageUrl?: string

  @IsNotEmpty()
  @IsNumber()
  sportTypeId?: number

  @IsNotEmpty()
  categories?: { connect: { id: number }[] }
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsNumber()
  stock?: number

  @IsOptional()
  @IsUrl()
  imageUrl?: string

  @IsOptional()
  @IsNumber()
  sportTypeId?: number

  @IsOptional()
  categories?: { connect: { id: number }[] }
}
