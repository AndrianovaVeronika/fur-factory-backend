import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UsersService} from "./users.service";
import {FindUserDto} from "./dtos/find-user.dto";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {RolesService} from "../roles/roles.service";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService,
                private rolesService: RolesService
    ) {
    }

    @Get()
    getUsers() {
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
    findAllUsers(@Body() body: FindUserDto) {
        return this.usersService.find(body);
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        console.log(body)
        const roles = [await this.rolesService.findByName('user')];
        return await this.usersService.create(body.email, body.password, roles, body.name, body.telephone, body.address);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
