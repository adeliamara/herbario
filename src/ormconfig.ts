import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: "db.wcztwuknnuyphmqqqddp.supabase.co", //process.env.DB_HOST_HERBARIO,
  port:5432, //parseInt(process.env.DB_PORT_HERBARIO, 10),
  username:"postgres", //process.env.DB_USERNAME_HERBARIO,
  password:"@9NSy%?&SxTqc*&", //String(process.env.DB_PASSWORD_HERBARIO),
  database: "postgres",//process.env.DB_NAME_HERBARIO,
  synchronize: true,//process.env.NODE_ENV_HERBARIO === 'development',
  logging: true,//process.env.NODE_ENV_HERBARIO === 'development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  extra: {
    ssl: false, //process.env.DB_SSL_HERBARIO === 'true' ? { rejectUnauthorized: false } : undefined,
  },
};

