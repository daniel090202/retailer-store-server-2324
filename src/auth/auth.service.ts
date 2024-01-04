import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login() {
    return {
      statusCode: 200,
      message: 'Successfully logged in.',
    };
  }

  register() {
    return {
      statusCode: 200,
      message: 'Successfully registered.',
    };
  }
}
