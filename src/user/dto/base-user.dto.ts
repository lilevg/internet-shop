import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'Name', description: 'User`s name' })
  public readonly name: string;

  @ApiProperty({ example: 'Surname', description: 'User`s surname' })
  public readonly surname: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'User`s email' })
  public readonly email: string;

  @ApiProperty({ example: '+38(097)3454543', description: 'User`s phone' })
  public readonly phone: string;

  @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
  public readonly password: string;

  @ApiProperty({ example: 'Male', description: 'User`s gender' })
  public readonly gender: string;

  @ApiProperty({ example: 'user', description: 'User`s role' })
  public readonly roles: string[];
}
