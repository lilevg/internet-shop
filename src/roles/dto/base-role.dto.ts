import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 'Admin', description: 'Title of role' })
  public value: string;

  @ApiProperty({
    example:
      'An Administrator, or Administrative Assistant, performs clerical duties to help an office run smoothly and efficiently. ',
    description: 'Description of role',
  })
  public descriptions: string;
}
