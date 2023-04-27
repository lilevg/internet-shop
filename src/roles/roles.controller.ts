import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Getting role by value' })
  @ApiResponse({ status: 200, type: Role })
  @UseGuards(JwtAuthGuard)
  @Get(':value')
  public async getByValue(@Param('value') value: string): Promise<Role> {
    return await this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Creating role' })
  @ApiResponse({ status: 201, type: Role })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleService.createRole(createRoleDto);
  }
}
