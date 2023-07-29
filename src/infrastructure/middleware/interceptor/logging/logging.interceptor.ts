import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/util/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: LoggerService;

  public constructor() {
    this.logger = new LoggerService();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const { headers, params, query, body } = req;

    const cls = context.getClass().name;
    const handler = context.getHandler().name;

    const uuid = headers['uuid'] as string;
    const user = req.user;

    this.logger.entryLog(cls, handler, uuid, {
      user,
      params,
      query,
      body,
    });

    return next.handle();
  }
}
