import 'reflect-metadata';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/users/models';
import { Cart } from 'src/cart/models/cart';
import { CartItem } from 'src/cart/models/cart-items';
import { Order } from 'src/order/models/order.entity';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Cart, CartItem, Order, User],
  migrations: [],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
};
