import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductTypesModule} from './models/product-types/product-types.module';
import {UsersModule} from './models/users/users.module';
import {ConfigModule} from "@nestjs/config";
import {OrdersModule} from './models/orders/orders.module';
import {RolesModule} from './models/roles/roles.module';
import {ProductsModule} from './models/products/products.module';
import {GenderCategoriesModule} from './models/gender-categories/gender-categories.module';
import {FurTypesModule} from './models/fur-types/fur-types.module';
import {CurrentUserMiddleware} from "./middlewares/current-user.middleware";
import {DatabaseBackupModule} from "./models/database-backup/database-backup.module";
import {APP_PIPE} from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot(),
        UsersModule, ProductTypesModule, OrdersModule, RolesModule,
        ProductsModule, GenderCategoriesModule, FurTypesModule, DatabaseBackupModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true
            })
        }
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*');
    }
}
