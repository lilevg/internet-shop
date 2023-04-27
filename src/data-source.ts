import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreatingProduct1682337380577 } from './migrations/1682337380577-CreatingProduct';
import { InsertIntoRole1682596692435 } from './migrations/1682596692435-InsertIntoRole';

config({ path: './.env' });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: ['**/*.entity.ts'],
  migrations: [CreatingProduct1682337380577, InsertIntoRole1682596692435],
  migrationsTableName: 'custom_migration_table',
});
