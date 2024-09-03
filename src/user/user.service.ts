import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  private readonly includes: Prisma.UserInclude = {
    orders: true,
    reviews: true,
    cart: true,
  }

  constructor(
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async getUserBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where,
      include: this.includes,
    })

    if (!user) this.handleUserNotFound(where)

    return user
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const existUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existUser)
      throw new BadRequestException('User with this email already exists')
  }

  private generateToken(email: string): string {
    return this.jwt.sign({ email })
  }

  private handleUserNotFound(where: Prisma.UserWhereUniqueInput): void {
    throw new BadRequestException(
      `User with ${
        where.id ? `id ${where.id}` : `email ${where.email}`
      } not found`,
    )
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.getUserBy({ email })
  }

  async findOneUserById(id: number): Promise<User | null> {
    return this.getUserBy({ id })
  }

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<{ user: User; token: string }> {
    await this.checkIfUserExists(data.email)

    const hashedPassword = await argon2.hash(data.password)

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      include: this.includes,
    })

    const token = this.generateToken(user.email)

    return { user, token }
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: this.includes,
    })
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    await this.getUserBy({ id })

    if (data.password)
      data.password = await argon2.hash(data.password as string)

    return this.prisma.user.update({
      where: { id },
      data,
      include: this.includes,
    })
  }

  async deleteUser(id: number): Promise<User> {
    await this.getUserBy({ id })

    return this.prisma.user.delete({
      where: { id },
      include: this.includes,
    })
  }
}
