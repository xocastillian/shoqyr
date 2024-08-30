import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as argon2 from 'argon2'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneUserByEmail(email)
    const decryptPassword = await argon2.verify(user.password, password)

    if (user && decryptPassword) return user
    throw new UnauthorizedException('User not found or invalid credentials')
  }

  async login(user: User) {
    const { id, email, fullName } = user
    return {
      id,
      email,
      fullName,
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      }),
    }
  }

  async getUser(user: User) {
    const { id, email, fullName } = user
    return {
      id,
      email,
      fullName,
    }
  }
}
