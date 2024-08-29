import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder({
      status: createOrderDto.status,
      totalAmount: createOrderDto.totalAmount,
      user: createOrderDto.userId
        ? { connect: { id: createOrderDto.userId } }
        : undefined,
      orderItems: createOrderDto.orderItems
        ? {
            create: createOrderDto.orderItems.map((item) => ({
              quantity: item.quantity,
              price: item.price,
              product: { connect: { id: item.productId } },
            })),
          }
        : undefined,
    })

    return order
  }

  @Get()
  async findAllOrders() {
    return this.orderService.findAllOrders()
  }

  @Get(':id')
  async findOrderById(@Param('id') id: string) {
    return this.orderService.findOneOrder(+id)
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(+id, {
      status: updateOrderDto.status,
      totalAmount: updateOrderDto.totalAmount,
      user: updateOrderDto.userId
        ? { connect: { id: updateOrderDto.userId } }
        : undefined,
      orderItems: updateOrderDto.orderItems
        ? {
            create: updateOrderDto.orderItems.map((item) => ({
              quantity: item.quantity,
              price: item.price,
              product: { connect: { id: item.productId } },
            })),
          }
        : undefined,
    })
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id)
  }
}
