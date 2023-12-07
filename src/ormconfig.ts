import { DataSourceOptions } from 'typeorm';
import 'dotenv/config'

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_HERBARIO,
  port: Number(process.env.DB_PORT_HERBARIO),
  username:process.env.DB_USERNAME_HERBARIO,
  password:String(process.env.DB_PASSWORD_HERBARIO),
  database: process.env.DB_NAME_HERBARIO,
  synchronize: process.env.NODE_ENV_HERBARIO === 'development',
  logging: process.env.NODE_ENV_HERBARIO === 'development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  extra: {
    ssl: process.env.DB_SSL_HERBARIO === 'true' ? { rejectUnauthorized: false } : undefined,
  },
};

