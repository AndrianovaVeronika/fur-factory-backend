import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductTypesModule} from './product-types/product-types.module';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { GenderCategoriesModule } from './gender-categories/gender-categories.module';
import { FurTypesModule } from './fur-types/fur-types.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        TypeOrmModule.forRoot(),
        UsersModule, ProductTypesModule, OrdersModule, RolesModule, ProductsModule, GenderCategoriesModule, FurTypesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
