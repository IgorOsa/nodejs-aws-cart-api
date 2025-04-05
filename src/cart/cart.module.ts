import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';

import { Cart } from './models/cart';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { CartItem } from './models/cart-items';
import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), OrderModule],
  providers: [CartService, CartRepository],
  controllers: [CartController],
})
export class CartModule {}
