import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder({
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
    });
  }

  @Get()
  findAll() {
    return this.orderService.findAllOrders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrder(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(+id, {
      ...(updateOrderDto.status ? { status: updateOrderDto.status } : {}),
      ...(updateOrderDto.totalAmount
        ? { totalAmount: updateOrderDto.totalAmount }
        : {}),
      ...(updateOrderDto.userId
        ? { user: { connect: { id: updateOrderDto.userId } } }
        : {}),
      ...(updateOrderDto.orderItems
        ? {
            orderItems: {
              upsert: updateOrderDto.orderItems.map((item) => ({
                where: { id: item.productId },
                update: {
                  quantity: item.quantity,
                  price: item.price,
                },
                create: {
                  quantity: item.quantity,
                  price: item.price,
                  product: { connect: { id: item.productId } },
                },
              })),
            },
          }
        : {}),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
