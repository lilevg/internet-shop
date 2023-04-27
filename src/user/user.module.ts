import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/roles.entity';
import { UserRoles } from '../roles/user-roles';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Cart } from '../carts/carts.entity';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRoles, Cart]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
})
export class UserModule {}
