import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;
}

export class UpdateOrderItemDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsInt()
  orderId?: number;

  @IsOptional()
  @IsInt()
  productId?: number;
}
