import { Product } from '../../product/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({ example: 'Chips, Pen, Cart', description: 'Product`s list' })
  public readonly listsProducts: Product[];

  @ApiProperty({ example: '1', description: 'unique identifier' })
  public readonly userId: string;
}
