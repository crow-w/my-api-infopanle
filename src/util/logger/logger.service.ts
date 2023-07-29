import { LoggerService as NestLoggerService } from '@nestjs/common';
import { configure, getLogger, Logger } from 'log4js';
import { config } from './logger.config';

export class LoggerService implements NestLoggerService {
  private static _logger: Logger;

  public constructor() {
    if (LoggerService._logger) {
      return this;
    }

    configure(config);
    LoggerService._logger = getLogger();
  }

  public entryLog(
    cls: string,
    handler: string,
    uuid: string,
    args: Record<string, any>,
  ) {
    const log = [
      `UUID: ${uuid}`,
      `${cls}.${handler} called with...`,
      this.parseMessage(args),
    ].join('\n');

    LoggerService._logger.info(log);
  }

  public exitLog(
    cls: string,
    handler: string,
    uuid: string,
    args: Record<string, any>,
  ) {
    const log = [
      `UUID: ${uuid}`,
      `${cls}.${handler} end with...`,
      this.parseMessage(args),
    ].join('\n');

    LoggerService._logger.info(log);
  }

  public log(message: string) {
    this.info(message);
  }

  public debug(message: string) {
    LoggerService._logger.debug(this.parseMessage(message));
  }

  public info(message: string) {
    LoggerService._logger.info(this.parseMessage(message));
  }

  public warn(message: string) {
    LoggerService._logger.warn(this.parseMessage(message));
  }

  public error(message: string, trace?: string) {
    const errorLogger = getLogger('error');
    if (trace) {
      errorLogger.error(`${message}\n${trace}`);
    } else {
      errorLogger.error(message);
    }
  }

  public errorWithUuid(uuid: string, error: any) {
    const log = [`UUID: ${uuid}`, this.parseMessage(error)].join('\n');
    LoggerService._logger.error(log);
  }

  private parseMessage(message: any): string {
    let parsed: any;

    switch (true) {
      case message instanceof Error:
        parsed = message.stack;
        break;

      case typeof message === 'string':
      case typeof message === 'number':
      case typeof message === 'symbol':
        parsed = message;
        break;

      default:
        parsed = JSON.stringify(message, null, 4);
        break;
    }

    return parsed;
  }
}
