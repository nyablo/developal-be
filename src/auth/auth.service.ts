import { Inject, Injectable } from '@nestjs/common';
import { AuthChallenge } from 'src/database/auth-challenge.entity';
import { User } from 'src/database/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_CHALLENGE_REPOSITORY')
    private authChallengeRepository: Repository<AuthChallenge>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async initiateLogin(phoneNumber: string): Promise<string> {
    const otp = this.generateOTP();
    const expiresAtTimestamp =
      Date.now() + parseInt(process.env.OTP_TTL_MILLISECONDS);

    const authChallenge = await this.authChallengeRepository.create({
      phoneNumber,
      otp,
      expiresAtTimestamp,
    });

    await this.authChallengeRepository.save(authChallenge);

    // TODO send OTP to phoneNumber
    console.log(`Sending OTP: ${otp} to phoneNumber: ${phoneNumber}`);

    return authChallenge.id;
  }

  async login(user: User) {
    const payload = { user };
    console.log('payload: ', JSON.stringify(payload));
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(challengeId: string, otp: string): Promise<any> {
    const challenge = await this.authChallengeRepository.findOne({
      where: { id: challengeId, otp },
    });

    if (!challenge) {
      return null;
    }

    if (Date.now() > challenge.expiresAtTimestamp) {
      return null;
    }

    const user = await this.userRepository.findOne({
      where: { phoneNumber: challenge.phoneNumber },
    });

    if (!user) {
      const newUser = await this.userRepository.create({
        phoneNumber: challenge.phoneNumber,
      });
      await this.userRepository.save(newUser);

      return newUser;
    }

    return user;
  }
}
