import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv-defaults/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: ['src/**/*.entity.ts'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
