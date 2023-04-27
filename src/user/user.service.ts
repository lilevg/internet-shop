import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Roles } from '../roles/enums/role.enum';
import { Cart } from '../carts/carts.entity';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  public async getUsersByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({
      ...createUserDto,
      roles: [],
    });
    const role = await this.roleService.getRoleByValue(Roles.User);
    user.roles = [role];

    await this.userRepository.save(user);

    const cart = await this.cartRepository.create({
      userId: user.id,
      listsProducts: [],
    });

    await this.cartRepository.save(cart);

    return user;
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async addRole(dto: AddRoleDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    const role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      user.roles.push(role);
      await this.userRepository.save(user);
      return user;
    }

    throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND);
  }
}
