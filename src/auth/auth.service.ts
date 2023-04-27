import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  public async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    return this.generateToken(user);
  }

  public async register(registerUserDto: RegisterUserDto) {
    const candidate = await this.userService.getUsersByEmail(
      registerUserDto.email,
    );

    if (candidate) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
    const user = await this.userService.register({
      ...registerUserDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUsersByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException({ message: 'This user does`n exist' });
    }

    const passwordEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Wrong password or email' });
  }
}
