import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'integer', nullable: false })
  count: number;
}
