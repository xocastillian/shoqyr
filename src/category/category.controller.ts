import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOneCategory(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
  ) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
