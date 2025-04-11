import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateOrderPayload, OrderStatus } from '../type';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { CartService, CartStatuses } from 'src/cart';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private cartService: CartService,
    private dataSource: DataSource,
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

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

      const savedOrder = await queryRunner.manager.save(order);
      await this.cartService.updateCartStatus(
        data.cartId,
        CartStatuses.ORDERED,
      );

      await queryRunner.commitTransaction();

      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed to create order: ' + error.message);
    } finally {
      await queryRunner.release();
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
