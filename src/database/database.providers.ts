import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const {
        RDS_HOSTNAME,
        RDS_PORT,
        RDS_DB_NAME,
        RDS_USERNAME,
        RDS_PASSWORD,
      } = process.env;
      const dataSource = new DataSource({
        type: 'mysql',
        host: RDS_HOSTNAME,
        port: parseInt(RDS_PORT),
        username: RDS_USERNAME,
        password: RDS_PASSWORD,
        database: RDS_DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // TODO must be disabled in prod
      });

      return dataSource.initialize();
    },
  },
];
