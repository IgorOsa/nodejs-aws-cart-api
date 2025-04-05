import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Address, OrderStatus } from '../type';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column('json')
  items: Array<{ productId: string; count: number }>;

  @Column({ name: 'cart_id', type: 'uuid' })
  cart_id: string;

  @Column('json')
  address: Address;

  @Column('json')
  statusHistory: Array<{
    status: OrderStatus.Open;
    timestamp: number;
    comment: string;
  }>;
}
