import { Injectable } from '@nestjs/common'
import { Prisma, Review } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({ data })
  }

  async findAllReviews(): Promise<Review[]> {
    return this.prisma.review.findMany()
  }

  async findOneReview(id: number): Promise<Review | null> {
    return this.prisma.review.findUnique({ where: { id } })
  }

  async updateReview(
    id: number,
    data: Prisma.ReviewUpdateInput,
  ): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data,
    })
  }

  async deleteReview(id: number): Promise<Review> {
    return this.prisma.review.delete({ where: { id } })
  }
}
