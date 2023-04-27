import { ApiProperty } from '@nestjs/swagger';

export class ChangeOrderStatusDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  public readonly order_id: string;

  @ApiProperty({ example: 'New', description: 'Order`s status' })
  public readonly status: string;
}
