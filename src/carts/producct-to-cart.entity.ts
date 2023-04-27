import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './carts.entity';
import { Product } from '../product/product.entity';

@Entity('carts_lists_products_products')
export class ProductToCart {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Cart, (cartsId) => cartsId.id)
  public cart: Cart;

  @ManyToOne(() => Product, { eager: true, cascade: true })
  public product: Product;
}
