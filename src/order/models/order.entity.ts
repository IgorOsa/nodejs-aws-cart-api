import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { OrderStatus } from '../type';
import { Cart } from 'src/cart/models/cart';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id: string;

  @Column({ name: 'cart_id', type: 'uuid' })
  cart_id: string;

  @Column('json')
  items: Array<{ productId: string; count: number }>;

  @Column('json')
  payment: string;

  @Column('json')
  delivery: string;

  @Column('text', { nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Open,
  })
  status: OrderStatus;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  total: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @ManyToOne(() => Cart, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @BeforeInsert()
  setCreationDate() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updated_at = new Date();
  }
}
