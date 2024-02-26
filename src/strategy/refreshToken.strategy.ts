import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UserDTO } from '../models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_TOKEN'),
    });
  }

  private static extractJWT(request: Request): string | null {
    if (
      request.cookies &&
      'refreshToken' in request.cookies &&
      request.cookies.refreshToken.length > 0
    ) {
      return request.cookies.refreshToken;
    }

    return null;
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
