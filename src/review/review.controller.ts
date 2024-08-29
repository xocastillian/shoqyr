import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    const { productId, userId, ...data } = createReviewDto
    return this.reviewService.createReview({
      ...data,
      product: { connect: { id: productId } },
      user: { connect: { id: userId } },
    })
  }

  @Get()
  findAll() {
    return this.reviewService.findAllReviews()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOneReview(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateReview(+id, updateReviewDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.deleteReview(+id)
  }
}
