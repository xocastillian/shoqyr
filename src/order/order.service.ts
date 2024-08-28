import { Injectable } from '@nestjs/common';
import { Prisma, Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async findAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findOneOrder(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
