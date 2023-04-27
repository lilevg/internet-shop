import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async getProductByName(name: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { name } });
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const candidateProduct = await this.getProductByName(createProductDto.name);

    if (candidateProduct) {
      throw new HttpException(
        'This product already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = await this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  public async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async deleteProduct(id: string): Promise<Product> {
    const deleteProduct = await this.productRepository.findOne({
      where: { id },
    });

    console.log(deleteProduct);
    return deleteProduct;
  }
}
