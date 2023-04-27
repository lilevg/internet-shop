import { forwardRef, Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './carts.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { ProductModule } from '../product/product.module';
import { ProductToCart } from './producct-to-cart.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CartsService],
  controllers: [CartsController],
  imports: [
    TypeOrmModule.forFeature([Cart, Product, User, ProductToCart]),
    forwardRef(() => ProductModule),
    JwtModule,
  ],
  exports: [CartsService],
})
export class CartsModule {}
