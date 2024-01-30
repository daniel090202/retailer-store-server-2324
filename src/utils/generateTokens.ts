import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class GenerateTokens {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signAccessToken(userName: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: userName,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
    });

    return {
      accessToken: accessToken,
    };
  }

  async signRefreshToken(userName: string): Promise<{ refreshToken: string }> {
    const payload = {
      sub: userName,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.configService.get('JWT_REFRESH_TOKEN'),
    });

    return {
      refreshToken: refreshToken,
    };
  }
}

export { GenerateTokens };
