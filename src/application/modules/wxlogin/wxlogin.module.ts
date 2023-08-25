import { Module } from '@nestjs/common';
import { WxloginService } from './wxlogin.service';
import { WxloginController } from './wxlogin.controller';
import { JwtStrategy } from '../auth/strategies';
import { AuthzJwtStrategy } from '../authz/strategies';
import {
  ACCESS_TOKEN_REPOSITORY,
  WXLOGIN_REPOSITORY,
} from 'src/domain/repository';
import { REDIS_HANDLER } from 'src/application/gateways/dbhander';
import { AccessTokenRepositoryService } from 'src/application/gateways/repository-service';
import { HTTP_HANDLER } from 'src/application/gateways/rpc-handler';
import { DbClientModule, RedisModule, RedisService } from 'src/infrastructure';
import { HttpXService } from 'src/infrastructure/http/httpx.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpXModule } from 'src/infrastructure/http/httpx.module';
import { LoggerModule } from 'src/util/logger/logger.module';
import { jwtConstants } from '../login/constants';
import { HttpModule } from '@nestjs/axios';
import { WxloginRepositoryService } from 'src/application/gateways/repository-service/wxlogin-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/application/gateways/repository-service/entities';

@Module({
  controllers: [WxloginController],
  providers: [
    WxloginService,
    JwtStrategy,
    {
      provide: WXLOGIN_REPOSITORY,
      useClass: WxloginRepositoryService,
    },
    {
      provide: ACCESS_TOKEN_REPOSITORY,
      useClass: AccessTokenRepositoryService,
    },
    {
      provide: REDIS_HANDLER,
      useClass: RedisService,
    },
    {
      provide: HTTP_HANDLER,
      useClass: HttpXService,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpXModule,
    HttpModule,
    DbClientModule,
    LoggerModule,
    RedisModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [WxloginService],
})
export class WxloginModule {}
