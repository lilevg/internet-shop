import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Order } from './orders.entity';

@Entity('product_to_order')
export class ProductToOrder {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Order, (order) => order.listsProducts)
  public order: Order;

  @ManyToOne(() => Product, { eager: true, cascade: true })
  public product: Product;
}
