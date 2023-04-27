import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductStatus } from './enums/product-status.enum';
import { BaseEntity } from '../utils/base-entity';
import { User } from '../user/user.entity';
import { ProductToOrder } from './product-to-order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order extends BaseEntity {
  @ApiProperty({ example: 'New', description: 'Order`s status' })
  @Column({ type: 'enum', enum: ProductStatus })
  public status: string;

  @ApiProperty({ example: 'User1', description: 'Order owner' })
  @ManyToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public user: User;

  @ApiProperty({ example: 'Chips, Pen, Cart', description: 'Product`s list' })
  @OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.order, {
    eager: true,
    cascade: true,
  })
  public listsProducts: ProductToOrder[];
}
