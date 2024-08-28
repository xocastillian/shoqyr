import { Injectable } from '@nestjs/common';
import { Prisma, Address } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createAddress(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({ data });
  }

  async findAllAddresses(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  async findOneAddress(id: number): Promise<Address | null> {
    return this.prisma.address.findUnique({ where: { id } });
  }

  async updateAddress(
    id: number,
    data: Prisma.AddressUpdateInput,
  ): Promise<Address> {
    return this.prisma.address.update({
      where: { id },
      data,
    });
  }

  async deleteAddress(id: number): Promise<Address> {
    return this.prisma.address.delete({ where: { id } });
  }
}
