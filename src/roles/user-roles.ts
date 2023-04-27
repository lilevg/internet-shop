import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './roles.entity';
import { User } from '../user/user.entity';

@Entity('user_roles')
export class UserRoles {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
  })
  public userId: string;

  @ManyToOne(() => Role, {
    createForeignKeyConstraints: false,
  })
  public roleId: string;
}
