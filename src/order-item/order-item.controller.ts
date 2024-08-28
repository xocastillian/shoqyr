import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { Prisma } from '@prisma/client';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItemDto: Prisma.OrderItemCreateInput) {
    return this.orderItemService.createOrderItem(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAllOrderItems();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOneOrderItem(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: Prisma.OrderItemUpdateInput) {
    return this.orderItemService.updateOrderItem(+id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.deleteOrderItem(+id);
  }
}
