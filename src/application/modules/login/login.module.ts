import { HttpModule } from '@nestjs/axios';
import { HTTP_HANDLER } from 'src/application/gateways/rpc-handler';
import { HttpXModule } from 'src/infrastructure/http/httpx.module';
import { HttpXService } from 'src/infrastructure/http/httpx.service';
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtStrategy } from '../auth/strategies';
import { AuthzJwtStrategy } from '../authz/strategies';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { DbClientModule, RedisModule, RedisService } from 'src/infrastructure';
import { LoggerModule } from 'src/util/logger/logger.module';
import { ACCESS_TOKEN_REPOSITORY } from 'src/domain/repository';
import { AccessTokenRepositoryService } from 'src/application/gateways/repository-service';
import { REDIS_HANDLER } from 'src/application/gateways/dbhander';
import { LoginRepositoryService } from 'src/application/gateways/repository-service/login-repository.service';
import { LOGIN_REPOSITORY } from 'src/domain/repository/login-repository.interface';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/application/gateways/repository-service/entities';
import { AuthRefreshService } from '../auth-refresh/auth-refresh.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    JwtStrategy,
    AuthRefreshService,
    AuthzJwtStrategy,
    {
      provide: LOGIN_REPOSITORY,
      useClass: LoginRepositoryService,
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
  exports: [LoginService],
})
export class LoginModule {}
