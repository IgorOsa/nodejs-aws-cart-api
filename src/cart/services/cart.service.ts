import { Injectable } from '@nestjs/common';
import { Cart } from '../models/cart';
import { PutCartPayload } from 'src/order/type';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from '../repositories/cart.repository';
import { Repository } from 'typeorm';
import { CartItem } from '../models/cart-items';
import { CartStatuses } from '../models';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findByUserId(userId);
  }

  async createByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.createByUserId(userId);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, payload: PutCartPayload): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);
    const userCartItems = await this.cartItemRepository.findBy({
      cart_id: userCart.id,
    });

    const index = userCartItems.findIndex(
      ({ product_id }) => product_id === payload.product.id,
    );

    if (index === -1) {
      const cartItem = this.cartItemRepository.create({
        cart_id: userCart.id,
        product_id: payload.product.id,
        count: payload.count,
        price: payload.product.price,
      });
      await this.cartItemRepository.save(cartItem);
    } else if (payload.count === 0) {
      await this.cartItemRepository.delete({
        cart_id: userCart.id,
        product_id: payload.product.id,
      });
    } else {
      userCartItems[index].count = payload.count;
      userCartItems[index].price = payload.product.price;
      await this.cartItemRepository.save(userCartItems[index]);
    }

    return await this.findOrCreateByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      await this.cartRepository.delete(userCart.id);
    }
  }

  async updateCartStatus(cartId: string, status: CartStatuses) {
    await this.cartRepository.updateCartStatus(cartId, status);
  }
}
