import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  "type": "postgres",
  "host": process.env.HOST,
  "port": 6543,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}

