import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  "type": "postgres",
  "host": process.env.HOST,
  "port": 5432,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}

