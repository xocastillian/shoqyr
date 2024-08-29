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
import { CartItemService } from './cart-item.service'
import { CreateCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto'

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body(ValidationPipe) createCartItemDto: CreateCartItemDto) {
    const { cartId, productId, ...data } = createCartItemDto
    return this.cartItemService.createCartItem({
      ...data,
      cart: { connect: { id: cartId } },
      product: { connect: { id: productId } },
    })
  }

  @Get()
  findAll() {
    return this.cartItemService.findAllCartItems()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOneCartItem(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.updateCartItem(+id, updateCartItemDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.deleteCartItem(+id)
  }
}
