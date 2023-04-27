import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { Cart } from '../carts/carts.entity';
import { ProductStatus } from './enums/product-status.enum';
import { Product } from '../product/product.entity';
import { ProductToOrder } from './product-to-order.entity';
import { User } from '../user/user.entity';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Cart) private cardRepository: Repository<Cart>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductToOrder)
    private productToOrderRepository: Repository<ProductToOrder>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private cartService: CartsService,
  ) {}
  public async createOrder(userId: string): Promise<Order> {
    const cart = await this.cardRepository.findOneBy({
      userId,
    });

    const order: Order = new Order();
    order.status = ProductStatus.New;
    order.user = await this.userRepository.findOneBy({ id: userId });

    const listProduct = cart.listsProducts.map((x) => {
      const obj = new ProductToOrder();
      obj.product = x.product;

      return obj;
    });

    order.listsProducts = listProduct;
    await this.orderRepository.save(order);
    await this.cartService.deleteAllProductsFromCart(userId);
    return order;
  }

  public async getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  public async changeStatus(
    orderStatusDto: ChangeOrderStatusDto,
  ): Promise<Order> {
    const order = await this.getOrderById(orderStatusDto.order_id);
    order.status = orderStatusDto.status;
    return await this.orderRepository.save(order);
  }
}
