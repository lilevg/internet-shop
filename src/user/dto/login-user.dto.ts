import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'User`s email' })
  public readonly email: string;

  @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
  public readonly password: string;
}
