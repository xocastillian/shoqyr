import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateShippingInfoDto {
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsDateString()
  shippingDate?: Date;

  @IsOptional()
  @IsDateString()
  deliveryDate?: Date;

  @IsInt()
  addressId: number;

  @IsInt()
  orderId: number;
}

export class UpdateShippingInfoDto {
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsDateString()
  shippingDate?: Date;

  @IsOptional()
  @IsDateString()
  deliveryDate?: Date;

  @IsOptional()
  @IsInt()
  addressId?: number;

  @IsOptional()
  @IsInt()
  orderId?: number;
}
