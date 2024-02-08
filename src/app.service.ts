import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home(): {
    statusCode: number;
    message: string;
  } {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully accessed.',
    };
  }
}
