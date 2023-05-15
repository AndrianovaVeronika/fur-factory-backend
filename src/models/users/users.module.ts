import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from './users.controller';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {RolesModule} from "../roles/roles.module";
import {AuthService} from "./auth.service";
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        CurrentUserInterceptor
    ],
    exports: [UsersService]
})
export class UsersModule {
}
