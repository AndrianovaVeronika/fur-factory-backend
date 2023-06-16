import {Module} from '@nestjs/common';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {ProductsModule} from "../products/products.module";
import {UsersModule} from "../users/users.module";
import {CurrentUserOrdersController} from "./current-user-orders.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Order]), ProductsModule, UsersModule],
    controllers: [OrdersController, CurrentUserOrdersController],
    providers: [OrdersService]
})
export class OrdersModule {
}
