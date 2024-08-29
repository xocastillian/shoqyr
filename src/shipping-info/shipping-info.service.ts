import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma, ShippingInfo } from '@prisma/client'

@Injectable()
export class ShippingInfoService {
  constructor(private prisma: PrismaService) {}

  async create(
    createShippingInfoDto: Prisma.ShippingInfoCreateInput,
  ): Promise<ShippingInfo> {
    return this.prisma.shippingInfo.create({
      data: createShippingInfoDto,
    })
  }

  async findAll(): Promise<ShippingInfo[]> {
    return this.prisma.shippingInfo.findMany()
  }

  async findOne(id: number): Promise<ShippingInfo | null> {
    return this.prisma.shippingInfo.findUnique({ where: { id } })
  }

  async update(
    id: number,
    updateShippingInfoDto: Prisma.ShippingInfoUpdateInput,
  ): Promise<ShippingInfo> {
    return this.prisma.shippingInfo.update({
      where: { id },
      data: updateShippingInfoDto,
    })
  }

  async remove(id: number): Promise<ShippingInfo> {
    return this.prisma.shippingInfo.delete({ where: { id } })
  }
}
