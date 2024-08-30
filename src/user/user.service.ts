import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

const includes: Prisma.UserInclude = {
  orders: true,
  addresses: true,
  reviews: true,
  cart: true,
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: includes,
    })

    if (!user)
      throw new BadRequestException(`User with Email ${email} not found`)

    return user
  }

  private async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: includes,
    })

    if (!user) throw new BadRequestException(`User with ID ${id} not found`)

    return user
  }

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<{ user: User; token: string }> {
    const existUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existUser)
      throw new BadRequestException('User with this email already exists')

    const hashedPassword = await argon2.hash(data.password)

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      include: includes,
    })

    const token = this.jwt.sign({ email: data.email })

    return { user, token }
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: includes,
    })
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.getUserByEmail(email)
  }

  async findOneUserById(id: number): Promise<User | null> {
    return this.getUserById(id)
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    await this.getUserById(id)

    if (data.password)
      data.password = await argon2.hash(data.password as string)

    return this.prisma.user.update({
      where: { id },
      data,
      include: includes,
    })
  }

  async deleteUser(id: number): Promise<User> {
    await this.getUserById(id)

    return this.prisma.user.delete({
      where: { id },
      include: includes,
    })
  }
}
