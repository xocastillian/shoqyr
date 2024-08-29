import { Injectable } from '@nestjs/common'
import { Prisma, Category } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data })
  }

  async findAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany()
  }

  async findOneCategory(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } })
  }

  async updateCategory(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    })
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } })
  }
}
