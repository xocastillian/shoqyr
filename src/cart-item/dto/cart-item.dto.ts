import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsNumber()
  cartId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}

export class UpdateCartItemDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  cartId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;
}
