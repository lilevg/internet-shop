import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Getting all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  public async getAllProduct(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Getting product by its name' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get(':name')
  public async getProductByName(@Param('name') name: string): Promise<Product> {
    return await this.productService.getProductByName(name);
  }

  @ApiOperation({ summary: 'Creating new product' })
  @ApiResponse({ status: 201, type: Product })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post()
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Removing product' })
  @ApiResponse({ status: 204, type: Product })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete('id')
  public async deleteProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
}
