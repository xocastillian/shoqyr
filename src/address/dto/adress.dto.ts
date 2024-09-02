import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator'
import { CreateShippingInfoDto } from 'src/shipping-info/dto/shipping-info.dto'

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  street: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  zipCode: string

  @IsOptional()
  @IsInt()
  userId?: number
}

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  street?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  state?: string

  @IsOptional()
  @IsString()
  zipCode?: string

  @IsOptional()
  @IsInt()
  userId?: number
}
