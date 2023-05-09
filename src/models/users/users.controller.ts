import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UsersService} from "./users.service";
import {FindUserDto} from "./dtos/find-user.dto";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {RolesService} from "../roles/roles.service";
import {UseUserInterceptor} from "../../interceptors/user.interceptor";

@Controller('auth')
@UseUserInterceptor()
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService,
                private rolesService: RolesService
    ) {
    }

    @Get()
    getAllUsers() {
        return this.usersService.find();
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findById(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Post('/find')
    findUsers(@Body() body: FindUserDto) {
        return this.usersService.find(body);
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        const roles = [await this.rolesService.findByName('user')];
        return await this.usersService.create(body.email, body.password, roles, body.name, body.address, body.telephone);
    }

    @Delete(':id')
    async removeUser(@Param('id') id: string) {
        const userId = parseInt(id);
        return {...(await this.usersService.remove(userId)), userId};
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const userId = parseInt(id);
        return this.usersService.update(userId, body);
    }
}
