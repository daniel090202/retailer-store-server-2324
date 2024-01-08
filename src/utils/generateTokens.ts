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
      expiresIn: '10m',
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
    });

    return {
      accessToken: accessToken,
    };
  }
}

export { GenerateTokens };
