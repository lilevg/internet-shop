import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { User } from '../user/user.entity';
import { UserRoles } from './user-roles';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role, User, UserRoles]), JwtModule],
  exports: [RolesService],
})
export class RolesModule {}
