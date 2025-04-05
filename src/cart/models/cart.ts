import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CartStatuses } from '.';
import { CartItem } from './cart-items';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'enum', enum: CartStatuses, default: CartStatuses.OPEN })
  status: CartStatuses;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart_id, { cascade: true })
  items: CartItem[];
}
