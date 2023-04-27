import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserGender } from './enums/user-gender.enum';
import { Role } from '../roles/roles.entity';
import { UserRoles } from '../roles/user-roles';
import { BaseEntity } from '../utils/base-entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Name', description: 'User`s name' })
  @Column({ length: 100 })
  public name: string;

  @ApiProperty({ example: 'Surname', description: 'User`s surname' })
  @Column({ length: 100 })
  public surname: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'User`s email' })
  @Column({ unique: true })
  public email: string;

  @ApiProperty({ example: '+38(097)3454543', description: 'User`s phone' })
  @Column({
    unique: true,
    nullable: true,
  })
  public phone: string;

  @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
  @Column()
  public password: string;

  @ApiProperty({ example: 'male', description: 'User`s gender' })
  @Column({ type: 'enum', enum: UserGender, default: UserGender.Unknown })
  public gender: string;

  @ApiProperty({ example: 'user', description: 'User`s role' })
  @ManyToMany(() => Role, () => UserRoles, { cascade: true, eager: true })
  @JoinTable()
  public roles: Role[];
}
