import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, Cart } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon2 from 'argon2'
import { CreateCartDto } from './dto/cart.dto'

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  private async findCartById(id: number): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { cartItems: true },
    })

    if (!cart) throw new BadRequestException(`Cart with ID ${id} not found`)

    return cart
  }

  private async checkIfCartExists(
    userId?: number,
    token?: string,
  ): Promise<Cart | null> {
    return this.prisma.cart.findFirst({
      where: {
        OR: [{ userId }, { token }],
      },
      include: { cartItems: true },
    })
  }

  private async generateToken(): Promise<string> {
    const randomString = `${Math.random().toString(36).slice(2, 14)}`
    const hashedToken = await argon2.hash(randomString)
    return hashedToken
  }

  async createOrUpdateCart(createCartDto: CreateCartDto): Promise<Cart> {
    const { userId, cartItems, token } = createCartDto

    if (userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } })
      if (!user) throw new BadRequestException('User not found')

      const existingCart = await this.checkIfCartExists(userId)

      if (existingCart) {
        return this.prisma.cart.update({
          where: { id: existingCart.id },
          data: {
            cartItems: {
              create: cartItems?.map((item) => ({
                quantity: item.quantity,
                product: { connect: { id: item.productId } },
              })),
            },
          },
          include: { cartItems: true },
        })
      } else {
        return this.prisma.cart.create({
          data: {
            user: { connect: { id: userId } },
            cartItems: {
              create: cartItems?.map((item) => ({
                quantity: item.quantity,
                product: { connect: { id: item.productId } },
              })),
            },
          },
          include: { cartItems: true },
        })
      }
    }
    // GUEST
    else {
      const existingCart = await this.checkIfCartExists(undefined, token)

      if (existingCart) {
        return this.prisma.cart.update({
          where: { id: existingCart.id },
          data: {
            cartItems: {
              create: cartItems?.map((item) => ({
                quantity: item.quantity,
                product: { connect: { id: item.productId } },
              })),
            },
          },
          include: { cartItems: true },
        })
      } else {
        const newToken = await this.generateToken()
        return this.prisma.cart.create({
          data: {
            token: newToken,
            cartItems: {
              create: cartItems?.map((item) => ({
                quantity: item.quantity,
                product: { connect: { id: item.productId } },
              })),
            },
          },
          include: { cartItems: true },
        })
      }
    }
  }

  async transferCartToUser(cartId: number, userId: number): Promise<Cart> {
    await this.findCartById(cartId)

    return this.prisma.cart.update({
      where: { id: cartId },
      data: {
        user: { connect: { id: userId } },
        token: null,
      },
      include: { cartItems: true },
    })
  }

  async findAllCarts(): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      include: { cartItems: true },
    })
  }

  async findOneCart(id: number): Promise<Cart | null> {
    return this.findCartById(id)
  }

  async updateCart(id: number, data: Prisma.CartUpdateInput): Promise<Cart> {
    await this.findCartById(id)
    return this.prisma.cart.update({
      where: { id },
      data,
      include: { cartItems: true },
    })
  }

  async deleteCart(id: number): Promise<Cart> {
    await this.findCartById(id)
    return this.prisma.cart.delete({
      where: { id },
      include: { cartItems: true },
    })
  }
}
