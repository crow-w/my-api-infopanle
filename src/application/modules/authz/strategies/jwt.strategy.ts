import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class AuthzJwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTHZ_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: process.env.AUTHZ_URL,
      audience: process.env.AUTHZ_CLIENT_ID,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    console.log(payload);
    return payload;
  }
}
