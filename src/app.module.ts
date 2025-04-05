import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { typeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CartModule,
    OrderModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
