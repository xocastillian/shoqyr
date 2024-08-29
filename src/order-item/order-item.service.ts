import { Injectable } from '@nestjs/common'
import { Prisma, OrderItem } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async createOrderItem(data: Prisma.OrderItemCreateInput): Promise<OrderItem> {
    return this.prisma.orderItem.create({ data })
  }

  async findAllOrderItems(): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany()
  }

  async findOneOrderItem(id: number): Promise<OrderItem | null> {
    return this.prisma.orderItem.findUnique({ where: { id } })
  }

  async updateOrderItem(
    id: number,
    data: Prisma.OrderItemUpdateInput,
  ): Promise<OrderItem> {
    return this.prisma.orderItem.update({
      where: { id },
      data,
    })
  }

  async deleteOrderItem(id: number): Promise<OrderItem> {
    return this.prisma.orderItem.delete({ where: { id } })
  }
}
