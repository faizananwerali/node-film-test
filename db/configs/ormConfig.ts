import { ConfigService } from '@nestjs/config';
// import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as path from 'path';

config();
const configService = new ConfigService();
console.log('path', path.join(__dirname, '/../../src/common/entities'));

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
