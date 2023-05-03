import {Module} from '@nestjs/common'
import {ProductTypesController} from './product-types.controller';
import {ProductTypesService} from './product-types.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductType} from "./product-type.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductType])],
    controllers: [ProductTypesController],
    providers: [ProductTypesService]
})
export class ProductTypesModule {
}
