import { Injectable } from '@nestjs/common';
import { UserResponse, JwtDecodedUser } from 'schema/dist/user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(user: JwtDecodedUser): Promise<UserResponse> {
    const userRecord = await this.prisma.user.upsert({
      where: { id: user.sub },
      update: {
        name: user.name,
        email: user.email,
        emailVerified: user.email_verified,
        image: user.picture,
      },
      create: {
        id: user.sub,
        name: user.name,
        email: user.email,
        emailVerified: user.email_verified,
        image: user.picture,
      },
    });

    return userRecord;
  }

  async me(user: JwtDecodedUser): Promise<UserResponse | null> {
    if (!user) {
      return null;
    }

    const userRecord = await this.prisma.user.findUnique({
      where: { id: user.sub },
    });

    return userRecord;
  }
}
