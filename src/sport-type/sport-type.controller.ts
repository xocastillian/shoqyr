import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportTypeService } from './sport-type.service';
import { Prisma } from '@prisma/client';
import { CreateSportTypeDto, UpdateSportTypeDto } from './dto/sport-type.dto';

@Controller('sport-type')
export class SportTypeController {
  constructor(private readonly sportTypeService: SportTypeService) {}

  @Post()
  create(@Body() createSportTypeDto: CreateSportTypeDto) {
    return this.sportTypeService.createSportType(createSportTypeDto);
  }

  @Get()
  findAll() {
    return this.sportTypeService.findAllSportTypes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportTypeService.findOneSportType(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSportTypeDto: UpdateSportTypeDto,
  ) {
    return this.sportTypeService.updateSportType(+id, updateSportTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportTypeService.deleteSportType(+id);
  }
}
