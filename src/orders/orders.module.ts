import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Cart } from '../carts/carts.entity';
import { Product } from '../product/product.entity';
import { ProductToOrder } from './product-to-order.entity';
import { User } from '../user/user.entity';
import { CartsModule } from '../carts/carts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Product, ProductToOrder, User]),
    forwardRef(() => CartsModule),
    JwtModule,
  ],
})
export class OrdersModule {}
