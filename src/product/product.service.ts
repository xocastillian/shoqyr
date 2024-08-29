import { Injectable } from '@nestjs/common'
import { Prisma, Product } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...data,
        categories: { connect: data.categories?.connect || [] },
      },
      include: {
        categories: true,
        sportType: true,
      },
    })
  }

  async findAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        categories: true,
        sportType: true,
      },
    })
  }

  async findOneProduct(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        sportType: true,
      },
    })
  }

  async updateProduct(
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        categories: true,
        sportType: true,
      },
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } })
  }
}
