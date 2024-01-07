import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secretOrKeyProvider: () => process.env.FIREBASE_PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
      },
      verifyOptions: {
        algorithms: ['RS256'],
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
