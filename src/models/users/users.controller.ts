import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UsersService} from "./users.service";
import {FindUserDto} from "./dtos/find-user.dto";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AdminGuard} from "../../guards/admin.guard";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/role.entity";
import {user} from '@prisma/client';

//added return types for functions using user from prisma/client

@Controller('users')
@UseGuards(AdminGuard)
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService,
                private authService: AuthService,
                private rolesService: RolesService
    ) {
    }

    @Get()
    getAllUsers(): Promise<user[]> {
        return this.usersService.find();
    }

    @Get('/:id')
    async findUser(@Param('id') id: string): Promise<user> {
        const user = await this.usersService.findById(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Post('/find')
    findUsers(@Body() body: FindUserDto): Promise<user[]> {
        return this.usersService.find(body);
    }

    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<user> {
        const roles: Role[] = [];
        if (body.roles) {
            for (const role of body.roles) {
                roles.push(await this.rolesService.findByName(role));
            }
        } else {
            roles.push(await this.rolesService.findByName("user"))
        }

        return await this.authService.signup(body.email, body.password, roles,
            body.name, body.address, body.telephone);
    }

    @Delete(':id')
    async removeUser(@Param('id') id: string): Promise<number> {
        const userId = parseInt(id);
        return (await this.usersService.remove(userId)) && userId;
    }

    @Patch('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto
    ): Promise<user> {
        const userId = parseInt(id);
        return this.usersService.update(userId, body);
    }
}
