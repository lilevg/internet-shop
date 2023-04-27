import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'Chips', description: 'Product`s name' })
  public readonly name: string;

  @ApiProperty({
    example:
      'This is a snack food in the form of a crisp, flat or slightly bowl shaped, bite-sized unit',
    description: 'Description of product',
  })
  public readonly description: string;

  @ApiProperty({ example: '$5.80', description: 'Product`s price' })
  public readonly price: number;

  @ApiProperty({
    example:
      'https://realdutchfood.com/wp-content/uploads/2013/02/Lays-Max-Ribbel-Chips-Original-Naturel.webp',
    description: 'Product`s image',
  })
  public readonly image: string;

  @ApiProperty({ example: '190', description: 'Product`s quantity' })
  public readonly quantity: number;
}
