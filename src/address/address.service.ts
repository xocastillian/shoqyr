import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, Address } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  private async findAddressById(id: number): Promise<Address | null> {
    const address = await this.prisma.address.findUnique({ where: { id } })
    if (!address)
      throw new BadRequestException(`Address with ID ${id} not found`)
    return address
  }

  async createAddress(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({ data })
  }

  async findAllAddresses(): Promise<Address[]> {
    return this.prisma.address.findMany()
  }

  async findOneAddress(id: number): Promise<Address | null> {
    return this.findAddressById(id)
  }

  async updateAddress(
    id: number,
    data: Prisma.AddressUpdateInput,
  ): Promise<Address> {
    await this.findAddressById(id)
    return this.prisma.address.update({
      where: { id },
      data,
    })
  }

  async deleteAddress(id: number): Promise<Address> {
    await this.findAddressById(id)
    return this.prisma.address.delete({ where: { id } })
  }
}
