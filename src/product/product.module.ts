import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CartsModule } from '../carts/carts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CartsModule),
    JwtModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
