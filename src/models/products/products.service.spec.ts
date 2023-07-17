import {Test, TestingModule} from '@nestjs/testing';
import {ProductsService} from './products.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./product.entity";

describe('ProductsService', () => {
    let service: ProductsService;
    let fakeProductsRepository: Partial<Repository<Product>>

    beforeEach(async () => {
        fakeProductsRepository = {};

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: fakeProductsRepository
                }
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
