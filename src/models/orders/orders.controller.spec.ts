import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import {OrdersService} from "./orders.service";
import {ProductsService} from "../products/products.service";

describe('OrdersController', () => {
  let controller: OrdersController;
  let fakeOrdersService: Partial<OrdersService>;
  let fakeProductsService: Partial<ProductsService>;

  beforeEach(async () => {
    fakeOrdersService = {};
    fakeProductsService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: fakeOrdersService
        },
        {
          provide: ProductsService,
          useValue: fakeProductsService
        }
      ]
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
