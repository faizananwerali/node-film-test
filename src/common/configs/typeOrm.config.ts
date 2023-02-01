import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    `${__dirname}/../../../src/common/entities/**/*entity.ts`,
    `${__dirname}/../../../src/common/entities/**/*.entity.ts`,
    `${__dirname}/../../../src/common/entities/*entity.ts`,
    `${__dirname}/../../../src/common/entities/*.entity.ts`,
  ],
  migrations: [`${__dirname}/../../../db/migrations/*{.ts}`],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
  retryAttempts: 5,
};

export default new DataSource({
  type: 'postgres',
  url: configService.get('POSTGRES_URL'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [
    'src/common/entities/**/*entity.ts',
    'src/common/entities/**/*.entity.ts',
    'src/common/entities/*entity.ts',
    'src/common/entities/*.entity.ts',
  ],
  migrations: ['db/migrations/*.ts'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
});
