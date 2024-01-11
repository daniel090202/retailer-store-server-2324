import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home(): ReturnValue {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully accessed.',
    };
  }
}
