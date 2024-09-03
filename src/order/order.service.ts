import { Injectable } from '@nestjs/common'
import { Prisma, Order } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
      include: {
        orderItems: true,
        user: true,
      },
    })
  }

  async findAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        orderItems: true,
        user: true,
      },
    })
  }

  async findOneOrder(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        user: true,
      },
    })
  }

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data,
      include: {
        orderItems: true,
        user: true,
      },
    })
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
      include: {
        orderItems: true,
        user: true,
      },
    })
  }
}
