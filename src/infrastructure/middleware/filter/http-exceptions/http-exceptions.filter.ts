import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from 'src/util/logger/logger.service';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  private readonly logger: LoggerService;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new LoggerService();
  }

  catch(err: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const resp: Response = ctx.getResponse();
    const uuid = req.headers['uuid'] as string;
    const serverErr = HttpStatus.INTERNAL_SERVER_ERROR;

    let httpStatus: HttpStatus;
    let responseBody: any;

    if (err instanceof HttpException) {
      httpStatus = err.getStatus();
      responseBody = err.getResponse();
    } else {
      httpStatus = serverErr;
    }

    if (httpStatus >= serverErr) {
      responseBody = {
        statusCode: serverErr,
        message: `服务器问题,请联系管理员: ${uuid}`,
        error: 'Internal Server Error',
      };
      this.logger.errorWithUuid(uuid, err);
    }

    httpAdapter.reply(resp, responseBody, httpStatus);
  }
}
