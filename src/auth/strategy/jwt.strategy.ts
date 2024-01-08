import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { PrismaService } from '@/prisma/prisma.service';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserDTO } from '@/dto';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN'),
    });
  }

  async validate(payload: { sub: string }): Promise<UserDTO> {
    const user = await this.prismaService.user.findUnique({
      where: {
        userName: payload.sub,
      },
    });

    return user as UserDTO;
  }
}

export { JwtStrategy };
