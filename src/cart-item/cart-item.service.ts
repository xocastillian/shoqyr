import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto';
import { CartItem, Prisma } from '@prisma/client';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async createCartItem(dto: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data: dto,
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async findAllCartItems(): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async findOneCartItem(id: number): Promise<CartItem | null> {
    return this.prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async updateCartItem(
    id: number,
    dto: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id },
      data: dto,
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async deleteCartItem(id: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
