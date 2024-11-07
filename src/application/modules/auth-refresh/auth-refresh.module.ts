import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRefreshService } from './auth-refresh.service';
import { AuthRefreshController } from './auth-refresh.controller';
import { jwtConstants } from '../login/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthRefreshService],
  controllers: [AuthRefreshController],
})
export class AuthRefreshModule {}
