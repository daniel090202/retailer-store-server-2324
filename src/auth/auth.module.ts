import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { GenerateTokens } from '../utils';
import { JwtStrategy } from '../strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, GenerateTokens, JwtStrategy],
})
class AuthModule {}

export { AuthModule };
