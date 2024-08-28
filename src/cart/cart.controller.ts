import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { Prisma } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: Prisma.CartCreateInput) {
    return this.cartService.createCart(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAllCarts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOneCart(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: Prisma.CartUpdateInput) {
    return this.cartService.updateCart(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCart(+id);
  }
}
