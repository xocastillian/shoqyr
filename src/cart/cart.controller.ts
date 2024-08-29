import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { Prisma } from '@prisma/client'
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body(ValidationPipe) createCartDto: CreateCartDto) {
    const { userId, cartItems } = createCartDto
    return this.cartService.createCart({
      user: { connect: { id: userId } },
      cartItems: {
        create: cartItems.map((item) => ({
          quantity: item.quantity,
          product: { connect: { id: item.productId } },
        })),
      },
    })
  }

  @Get()
  findAll() {
    return this.cartService.findAllCarts()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOneCart(+id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateCartDto: UpdateCartDto,
  ) {
    const { userId, cartItems } = updateCartDto

    return this.cartService.updateCart(id, {
      ...(userId ? { user: { connect: { id: userId } } } : {}),
      ...(cartItems
        ? {
            cartItems: {
              upsert: cartItems.map((item) => ({
                where: { id: item.productId },
                update: { quantity: item.quantity },
                create: {
                  quantity: item.quantity,
                  product: { connect: { id: item.productId } },
                  cart: { connect: { id: id } },
                },
              })),
            },
          }
        : {}),
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCart(+id)
  }
}
