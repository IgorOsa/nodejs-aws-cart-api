import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services';
import { Order } from './models/order.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), forwardRef(() => CartModule)],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
