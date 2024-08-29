import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

const includes = {
  orders: true,
  addresses: true,
  reviews: true,
  cart: true,
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
      include: {
        ...includes,
      },
    })
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        ...includes,
      },
    })
  }

  async findOneUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        ...includes,
      },
    })
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        ...includes,
      },
    })
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: {
        ...includes,
      },
    })
  }
}
