import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductTypesModule} from './product-types/product-types.module';
import {UsersService} from './users/users.service';
import {UsersModule} from './users/users.module';
import {User} from "./users/user.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        TypeOrmModule.forRoot(),
        // TypeOrmModule.forRootAsync({
        //   inject: [ConfigService],
        //   useFactory: (config: ConfigService) => {
        //     return {
        //       type: 'postgres',
        //       database: config.get<string>('DB_NAME'),
        //         //synchronizes entities with real db tables
        //       synchronize: true,
        //       entities: [User]
        //     };
        //   },
        // }),
        ProductTypesModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, UsersService],
})
export class AppModule {
}
