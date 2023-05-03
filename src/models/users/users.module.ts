import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from './users.controller';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {RolesModule} from "../roles/roles.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
}
