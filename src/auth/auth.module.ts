import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { GenerateTokens } from '../utils';
import { PrismaModule } from '../prisma/prisma.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from '../strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, GenerateTokens, JwtStrategy],
})
class AuthModule {}

export { AuthModule };
