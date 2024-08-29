import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import {
  CreateCartItemDto,
  UpdateCartItemDto,
} from 'src/cart-item/dto/cart-item.dto';

export class CreateCartDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  cartItems?: CreateCartItemDto[];
}

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCartItemDto)
  cartItems?: UpdateCartItemDto[];
}
