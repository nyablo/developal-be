import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './auth.providers';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
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
  controllers: [AuthController],
  providers: [...authProviders, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
