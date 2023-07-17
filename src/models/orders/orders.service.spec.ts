import {Test, TestingModule} from '@nestjs/testing';
import {OrdersService} from './orders.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./order.entity";

describe('OrdersService', () => {
    let service: OrdersService;
    let fakeOrdersRepository: Partial<Repository<Order>>

    beforeEach(async () => {
        fakeOrdersRepository = {};

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: getRepositoryToken(Order),
                    useValue: fakeOrdersRepository
                }
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
