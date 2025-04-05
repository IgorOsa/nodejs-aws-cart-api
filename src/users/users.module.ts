import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services';
import { User } from './models';
import { UsersRepository } from './repositories/users.repository';
import { Cart } from 'src/cart/models/cart';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
