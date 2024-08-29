import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from 'src/order-item/dto/order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  @IsOptional()
  orderItems?: CreateOrderItemDto[];

  @IsOptional()
  @IsNumber()
  shippingInfoId?: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  orderItems?: UpdateOrderItemDto[];

  @IsOptional()
  @IsNumber()
  shippingInfoId?: number;
}
