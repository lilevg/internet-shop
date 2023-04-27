import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductToCart } from './producct-to-cart.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('carts')
export class Cart {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column()
  public userId: string;

  @ApiProperty({ example: 'Chips, Pen, Cart', description: 'Product`s list' })
  @ManyToMany(() => ProductToCart, (productToCart) => productToCart.cart, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public listsProducts: ProductToCart[];
}
