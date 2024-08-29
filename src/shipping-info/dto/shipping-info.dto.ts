import {
  IsOptional,
  IsString,
  IsInt,
  IsDateString,
  isNotEmpty,
  IsNotEmpty,
} from 'class-validator';

export class CreateShippingInfoDto {
  @IsString()
  @IsNotEmpty()
  trackingNumber: string;

  @IsDateString()
  @IsNotEmpty()
  shippingDate: Date;

  @IsDateString()
  @IsNotEmpty()
  deliveryDate: Date;

  @IsInt()
  @IsNotEmpty()
  addressId: number;

  @IsInt()
  @IsNotEmpty()
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
