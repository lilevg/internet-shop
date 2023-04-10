import { Controller, Get } from '@nestjs/common';
import {User} from "./user.entity";

@Controller('user')
export class UserController {
    @Get()
    public async getAllUsers(): Promise<User[]>{
        return `hjbjh`;
    }
}
