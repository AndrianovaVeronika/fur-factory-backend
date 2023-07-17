import {Test, TestingModule} from '@nestjs/testing';
import {ProductsController} from './products.controller';
import {ProductTypesService} from "../product-types/product-types.service";
import {GenderCategoriesService} from "../gender-categories/gender-categories.service";
import {FurTypesService} from "../fur-types/fur-types.service";
import {ProductsService} from "./products.service";

describe('ProductsController', () => {
    let controller: ProductsController;
    let fakeProductsService: Partial<ProductsService>;
    let fakeProductTypesService: Partial<ProductTypesService>;
    let fakeGenderCategoriesService: Partial<GenderCategoriesService>;
    let fakeFurTypesService: Partial<FurTypesService>;

    beforeEach(async () => {
        fakeProductsService = {};
        fakeProductTypesService = {};
        fakeGenderCategoriesService = {};
        fakeFurTypesService = {};

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                  provide: ProductsService,
                  useValue: fakeProductsService
                },
                {
                    provide: ProductTypesService,
                    useValue: fakeProductTypesService
                },
                {
                    provide: GenderCategoriesService,
                    useValue: fakeGenderCategoriesService
                },
                {
                    provide: FurTypesService,
                    useValue: fakeFurTypesService
                }
            ]
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
