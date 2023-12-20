import { DataSource } from 'typeorm';
import { Contact } from 'src/database/contact.entity';
import { User } from 'src/database/user.entity';

export const contactProviders = [
  {
    provide: 'CONTACT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contact),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
