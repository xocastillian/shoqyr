import { Injectable } from '@nestjs/common';
import { Prisma, Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({
      data,
      include: {
        cartItems: true,
      },
    });
  }

  async findAllCarts(): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      include: {
        cartItems: true,
      },
    });
  }

  async findOneCart(id: number): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { id },
      include: {
        cartItems: true,
      },
    });
  }

  async updateCart(id: number, data: Prisma.CartUpdateInput): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id },
      data,
      include: {
        cartItems: true,
      },
    });
  }

  async deleteCart(id: number): Promise<Cart> {
    return this.prisma.cart.delete({
      where: { id },
      include: {
        cartItems: true,
      },
    });
  }
}
