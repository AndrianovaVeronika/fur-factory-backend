import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Session} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UsersService} from "./users.service";
import {FindUserDto} from "./dtos/find-user.dto";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {RolesService} from "../roles/roles.service";
import {AuthService} from "./auth.service";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService,
                private authService: AuthService,
                private rolesService: RolesService
    ) {
    }

    @Get()
    getAllUsers() {
        return this.usersService.find();
    }

    @Get('/current')
    getCurrentUserId(@Session() session: any) {
        return this.usersService.findById(session.userId);
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

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const roles = [await this.rolesService.findByName('user')];
        const user = await this.authService.signup(body.email, body.password, roles, body.name, body.address, body.telephone);
        session.userId = user.userId;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.userId;
        return user;
    }

    @Delete(':id')
    async removeUser(@Param('id') id: string) {
        const userId = parseInt(id);
        return (await this.usersService.remove(userId)) && userId;
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const userId = parseInt(id);
        return this.usersService.update(userId, body);
    }
}
