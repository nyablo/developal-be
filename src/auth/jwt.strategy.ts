import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'firebase-jwt') {
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.FIREBASE_PUBLIC_KEY,
        algorithms: ['RS256'],
        requestProperty: 'user',
        passReqToCallback: true,
      },
      async (req, _, done) => {
        const jwt = req.get('Authorization').replace('Bearer ', '');
        try {
          const user = await this.validate(jwt);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    );

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }
  }

  async validate(payload: any) {
    const user = await admin.auth().verifyIdToken(payload, true);
    return user;
  }
}
