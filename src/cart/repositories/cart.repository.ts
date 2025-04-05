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
    return this.repository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const newCart = this.repository.create({
      user_id: userId,
      status: CartStatuses.OPEN,
    });
    const cart = await this.repository.save(newCart);

    return cart;
  }

  async delete(cartId: string) {
    await this.delete(cartId);
  }
}
