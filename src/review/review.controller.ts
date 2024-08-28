import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Prisma } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: Prisma.ReviewCreateInput) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAllReviews();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOneReview(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: Prisma.ReviewUpdateInput) {
    return this.reviewService.updateReview(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.deleteReview(+id);
  }
}
