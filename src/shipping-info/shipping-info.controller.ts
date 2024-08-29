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
import { ShippingInfoService } from './shipping-info.service'
import {
  CreateShippingInfoDto,
  UpdateShippingInfoDto,
} from './dto/shipping-info.dto'

@Controller('shipping-info')
export class ShippingInfoController {
  constructor(private readonly shippingInfoService: ShippingInfoService) {}

  @Post()
  create(@Body(ValidationPipe) createShippingInfoDto: CreateShippingInfoDto) {
    const { orderId, addressId, ...data } = createShippingInfoDto
    return this.shippingInfoService.create({
      ...data,
      order: { connect: { id: orderId } },
      address: { connect: { id: addressId } },
    })
  }

  @Get()
  findAll() {
    return this.shippingInfoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingInfoService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateShippingInfoDto: UpdateShippingInfoDto,
  ) {
    return this.shippingInfoService.update(+id, updateShippingInfoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingInfoService.remove(+id)
  }
}
