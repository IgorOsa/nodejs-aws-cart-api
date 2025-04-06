import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderPayload, OrderStatus } from '../type';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getAll() {
    return await this.orderRepository.find();
  }

  async findById(orderId: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product'],
    });
  }

  async create(data: CreateOrderPayload): Promise<Order> {
    try {
      const order = this.orderRepository.create({
        user_id: data.userId,
        cart_id: data.cartId,
        items: data.items,
        total: data.total,
        status: OrderStatus.Open,
        delivery: JSON.stringify(data.address),
        comments: data?.comments,
        payment: '',
      });
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new BadRequestException('Failed to create order: ' + error.message);
    }
  }

  // TODO add  type
  async update(orderId: string, data: Order) {
    const order = await this.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order does not exist.');
    }

    return await this.orderRepository.save({
      ...data,
      id: orderId,
    });
  }
}
