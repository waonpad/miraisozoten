import { Inject, Injectable } from '@nestjs/common';
import { UserResponse, JwtDecodedUser } from 'schema/dist/user';
import { InjectionToken } from 'src/config/environments/constants/injection-token.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(@Inject(InjectionToken.PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async login(user: JwtDecodedUser): Promise<UserResponse> {
    // 匿名ログインの場合
    if (user.provider_id === 'anonymous') {
      user.name = 'ゲスト';
      user.email = `${user.sub}@example.com`;
      user.email_verified = false;
    }

    // 匿名ログインからソーシャルアカウントにリンクした場合
    // ソーシャルアカウントのデータがマウントされないので、プロバイダーのデータから取り出してくる
    // Google以外の場合を検証していない
    // Googleログイン以外をすることを想定していないので、providerData[0]としている
    if (!user.name) {
      user.name = user.userRecord.providerData[0].displayName;
      user.picture = user.userRecord.providerData[0].photoURL;
    }

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
