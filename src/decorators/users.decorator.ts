import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const GetUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();

    return request.user;
  },
);

export { GetUser };
