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
import { AddressService } from './address.service'
import { CreateAddressDto, UpdateAddressDto } from './dto/adress.dto'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
    const { userId, ...data } = createAddressDto
    return this.addressService.createAddress({
      ...data,
      ...(userId && { user: { connect: { id: userId } } }),
    })
  }

  @Get()
  findAll() {
    return this.addressService.findAllAddresses()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOneAddress(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(+id, updateAddressDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.deleteAddress(+id)
  }
}
