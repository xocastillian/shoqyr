import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: Prisma.OrderCreateInput) {
    return this.orderService.createOrder(createOrderDto);
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
  update(@Param('id') id: string, @Body() updateOrderDto: Prisma.OrderUpdateInput) {
    return this.orderService.updateOrder(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
