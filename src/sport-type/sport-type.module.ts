import { Module } from '@nestjs/common'
import { SportTypeService } from './sport-type.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { SportTypeController } from './sport-type.controller'

@Module({
  controllers: [SportTypeController],
  providers: [SportTypeService, PrismaService],
})
export class SportTypeModule {}
