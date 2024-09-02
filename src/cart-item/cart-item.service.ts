import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CartItem, Prisma } from '@prisma/client'

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  private async findCartItemById(id) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        product: true,
      },
    })

    if (!cartItem)
      throw new BadRequestException(`Cart item with ID ${id} not found`)

    return cartItem
  }

  async createCartItem(dto: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data: dto,
      include: {
        cart: true,
        product: true,
      },
    })
  }

  async findAllCartItems(): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      include: {
        cart: true,
        product: true,
      },
    })
  }

  async findOneCartItem(id: number): Promise<CartItem | null> {
    await this.findCartItemById(id)

    return this.prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        product: true,
      },
    })
  }

  async updateCartItem(
    id: number,
    dto: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    await this.findCartItemById(id)

    return this.prisma.cartItem.update({
      where: { id },
      data: dto,
      include: {
        cart: true,
        product: true,
      },
    })
  }

  async deleteCartItem(id: number): Promise<CartItem> {
    await this.findCartItemById(id)

    return this.prisma.cartItem.delete({ where: { id } })
  }
}
