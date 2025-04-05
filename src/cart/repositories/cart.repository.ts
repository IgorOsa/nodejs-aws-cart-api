import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../models/cart';
import { CartStatuses } from '../models';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.repository.findOne({ where: { user_id: userId } });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const timestamp = Date.now();
    const newCart = this.repository.create({
      user_id: userId,
      created_at: timestamp,
      updated_at: timestamp,
      status: CartStatuses.OPEN,
    });

    return this.repository.save(newCart);
  }

  async delete(cartId: string) {
    await this.delete(cartId);
  }
}
