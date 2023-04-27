import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  public async createRole(createDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create({ ...createDto });
    await this.roleRepository.save(role);
    return role;
  }

  public async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ value });
    return role;
  }
}
