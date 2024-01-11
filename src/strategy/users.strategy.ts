import { Strategy, ExtractJwt } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UserDTO } from '@/models';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'users') {
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
