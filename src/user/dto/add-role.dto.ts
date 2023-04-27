import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'Admin', description: 'New user`s role' })
  public value: string;

  @ApiProperty({ example: '1', description: 'User`s id' })
  public userId: string;
}
