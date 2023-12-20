import { DataSource } from 'typeorm';
import { AuthChallenge } from 'src/database/auth-challenge.entity';
import { User } from 'src/database/user.entity';

export const authProviders = [
  {
    provide: 'AUTH_CHALLENGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AuthChallenge),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
