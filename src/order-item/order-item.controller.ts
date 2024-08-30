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
import { OrderItemService } from './order-item.service'
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto'

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body(ValidationPipe) createOrderItemDto: CreateOrderItemDto) {
    const { orderId, productId, ...data } = createOrderItemDto
    return this.orderItemService.createOrderItem({
      ...data,
      order: { connect: { id: orderId } },
      product: { connect: { id: productId } },
    })
  }

  @Get()
  findAll() {
    return this.orderItemService.findAllOrderItems()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOneOrderItem(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.updateOrderItem(+id, updateOrderItemDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.deleteOrderItem(+id)
  }
}
