import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* eslint-disable */
export const RequestUser = createParamDecorator(
  /* eslint-enable */
  async (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);
