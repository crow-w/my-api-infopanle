import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Modules from './application/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const modules = Object.values(Modules);
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: Boolean(process.env.IS_IGNORE_ENV_FILE) || false,
      isGlobal: true,
      envFilePath: `${__dirname}/env/${
        process.env.TARGET_ENV || 'development'
      }.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('GATE_HOST') || '127.0.0.1',
        port: configService.get<number>('GATE_PORT') || 3306,
        username: configService.get<string>('GATE_USER') || 'root',
        password: configService.get<string>('GATE_PASS') || 'root',
        database: configService.get<string>('GATE_SCHEMA') || 'test',
        entities: [
          __dirname + '/application/gateways/repository-service/entities/*.js',
        ],
        synchronize: true,
        logging: configService.get('DB_LOG_LEVEL') === 'debug' ? true : false,
      }),
      inject: [ConfigService],
    }),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
