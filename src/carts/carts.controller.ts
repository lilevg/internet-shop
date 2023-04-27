import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Product } from '../product/product.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

type temporalUserIdWithProductIdDto = { userId: string; productId: string };

@ApiTags('Carts')
@Controller('carts')
@ApiBearerAuth()
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @ApiOperation({ summary: 'Removing product' })
  @ApiResponse({ status: 204, type: Product })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete()
  public async deleteProductFromCart(
    @Body() deleteProductDto: temporalUserIdWithProductIdDto,
  ): Promise<Product> {
    return await this.cartsService.deleteProductFromCart(
      deleteProductDto.productId,
      deleteProductDto.userId,
    );
  }

  @ApiOperation({ summary: 'Decrease product from cart' })
  @ApiResponse({ status: 200, type: Product })
  @Patch('decreaseProductCount')
  public async decreaseProducts(
    @Body() decreaseProductDto: temporalUserIdWithProductIdDto,
  ) {
    return await this.cartsService.decreaseProduct(
      decreaseProductDto.productId,
      decreaseProductDto.userId,
    );
  }

  @ApiOperation({ summary: 'Getting all products from users cart' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get(':userId')
  public async getAllProducts(
    @Param('userId') userId: string,
  ): Promise<Product[]> {
    return await this.cartsService.getAllProducts(userId);
  }

  @ApiOperation({ summary: 'Add product to user`s cart' })
  @ApiResponse({ status: 200, type: Product })
  @Post('addProductToCart')
  public async addProductToCart(
    @Body() addProductToCartDto: temporalUserIdWithProductIdDto,
  ): Promise<Product> {
    return await this.cartsService.addProductToCarts(
      addProductToCartDto.productId,
      addProductToCartDto.userId,
    );
  }
}
