import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Creating order' })
  @ApiResponse({ status: 201, type: Order })
  @Post()
  public async createOrder(
    @Body() userIdDto: { userId: string },
  ): Promise<Order> {
    return await this.orderService.createOrder(userIdDto.userId);
  }

  @ApiOperation({ summary: 'Change order`s status' })
  @ApiResponse({ status: 200, type: Order })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Patch('changeStatus')
  public async changeStatus(
    @Body() orderStatusDto: ChangeOrderStatusDto,
  ): Promise<Order> {
    return await this.orderService.changeStatus(orderStatusDto);
  }

  @ApiOperation({ summary: 'Getting order by its id' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getOrderById(@Body() orderId: { orderId: string }) {
    return await this.orderService.getOrderById(orderId.orderId);
  }
}
