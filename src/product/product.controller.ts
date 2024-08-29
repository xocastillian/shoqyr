import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    const { sportTypeId, ...data } = createProductDto
    return this.productService.createProduct({
      ...data,
      sportType: { connect: { id: sportTypeId } },
    })
  }

  @Get()
  findAll() {
    return this.productService.findAllProducts()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneProduct(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id)
  }
}
