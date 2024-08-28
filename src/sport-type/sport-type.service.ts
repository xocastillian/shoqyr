import { Injectable } from '@nestjs/common';
import { Prisma, SportType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async createSportType(data: Prisma.SportTypeCreateInput): Promise<SportType> {
    return this.prisma.sportType.create({ data });
  }

  async findAllSportTypes(): Promise<SportType[]> {
    return this.prisma.sportType.findMany();
  }

  async findOneSportType(id: number): Promise<SportType | null> {
    return this.prisma.sportType.findUnique({
      where: { id },
    });
  }

  async updateSportType(
    id: number,
    data: Prisma.SportTypeUpdateInput,
  ): Promise<SportType> {
    return this.prisma.sportType.update({
      where: { id },
      data,
    });
  }

  async deleteSportType(id: number): Promise<SportType> {
    return this.prisma.sportType.delete({
      where: { id },
    });
  }
}
