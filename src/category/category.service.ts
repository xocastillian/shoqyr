import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, Category } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkIfCategoryExists(name: string): Promise<void> {
    const existCategory = await this.prisma.category.findFirst({
      where: { name },
    })

    if (existCategory)
      throw new BadRequestException('This category already exists')
  }

  private async findCategoryById(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } })

    if (!category) {
      throw new BadRequestException(`Category with ID ${id} not found`)
    }

    return category
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    await this.checkIfCategoryExists(data.name)
    return this.prisma.category.create({ data })
  }

  async findAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany()
  }

  async findOneCategory(id: number): Promise<Category> {
    return this.findCategoryById(id)
  }

  async updateCategory(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    await this.findCategoryById(id)
    return this.prisma.category.update({ where: { id }, data })
  }

  async deleteCategory(id: number): Promise<Category> {
    await this.findCategoryById(id)
    return this.prisma.category.delete({ where: { id } })
  }
}
