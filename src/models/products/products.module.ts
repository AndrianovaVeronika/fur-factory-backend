import {Module} from '@nestjs/common';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {ProductTypesModule} from "../product-types/product-types.module";
import {GenderCategoriesModule} from "../gender-categories/gender-categories.module";
import {FurTypesModule} from "../fur-types/fur-types.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        ProductTypesModule,
        GenderCategoriesModule,
        FurTypesModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {
}
