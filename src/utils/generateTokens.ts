import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

class GenerateTokens {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signAccessToken(userName: string): Promise<string> {
    const payload = {
      sub: userName,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
    });
  }
}

export { GenerateTokens };
