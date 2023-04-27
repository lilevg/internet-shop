import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../utils/base-entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty({ example: 'Chips', description: 'Product`s name' })
  @Column({ unique: true })
  public name: string;

  @ApiProperty({
    example:
      'This is a snack food in the form of a crisp, flat or slightly bowl shaped, bite-sized unit',
    description: 'Description of product',
  })
  @Column({ length: 100 })
  public description: string;

  @ApiProperty({ example: '$5.80', description: 'Product`s price' })
  @Column({ type: 'float' })
  public price: number;

  @ApiProperty({
    example:
      'https://realdutchfood.com/wp-content/uploads/2013/02/Lays-Max-Ribbel-Chips-Original-Naturel.webp',
    description: 'Product`s image',
  })
  @Column()
  public image: string;

  @ApiProperty({ example: '190', description: 'Product`s quantity' })
  @Column()
  public quantity: number;
}
