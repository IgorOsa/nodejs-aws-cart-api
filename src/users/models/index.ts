import { Cart } from 'src/cart/models/cart';
import { Order } from 'src/order/models/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  password: string;

  @OneToMany(() => Cart, (cart) => cart.user_id, { cascade: true })
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user_id, { cascade: true })
  orders: Order[];
}
