/* eslint-disable @typescript-eslint/naming-convention */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Uid = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();
    const uuid = request.headers['uuid'] as string;
    return uuid;
  },
);
