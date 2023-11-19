import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.user);
    return req.user;
  },
);
