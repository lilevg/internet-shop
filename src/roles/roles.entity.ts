import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './enums/role.enum';
import { User } from '../user/user.entity';
import { UserRoles } from './user-roles';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'Admin', description: 'Title of role' })
  @Column({ type: 'enum', enum: Roles })
  public value: string;

  @ApiProperty({
    example:
      'An Administrator, or Administrative Assistant, performs clerical duties to help an office run smoothly and efficiently. ',
    description: 'Description of role',
  })
  @Column({ length: 100 })
  public description: string;

  @ApiProperty({ example: 'User1', description: 'The one who has this role' })
  @ManyToMany(() => User, () => UserRoles)
  @JoinTable()
  public users: User[];
}
