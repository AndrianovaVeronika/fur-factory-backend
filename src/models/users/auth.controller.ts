import {Body, Controller, Delete, Get, Patch, Post, Session, UseGuards} from '@nestjs/common';
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UsersService} from "./users.service";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {RolesService} from "../roles/roles.service";
import {AuthService} from "./auth.service";
import {CurrentUser} from "./decorators/current-user.decorator";
import {User} from "./user.entity";
import {AuthGuard} from "../../guards/auth.guard";
import {SignupUserDto} from "./dtos/signup-user-dto";
import {getNewToken} from "../../utils/accessToken.util";

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
    constructor(private usersService: UsersService,
                private authService: AuthService,
                private rolesService: RolesService
    ) {
    }

    @Get('/current')
    @UseGuards(AuthGuard)
    getCurrentUser(@CurrentUser() user: User) {
        return user;
    }

    // @Post('/signout')
    // signOut(@Session() session: any) {
    //     session.userId = null;
    // }

    @Post('/signup')
    async signup(@Body() body: SignupUserDto) {
        const roles = [await this.rolesService.findByName('user')];
        const user = await this.authService.signup(body.email, body.password, roles, body.name, body.address, body.telephone);
        const accessToken = getNewToken(user.userId);
        return {...user, accessToken};
    }

    @Post('/signin')
    async signin(@Body() body: SignupUserDto) {
        const user = await this.authService.signin(body.email, body.password);
        const accessToken = getNewToken(user.userId);
        return {...user, accessToken};
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteAccount(@CurrentUser() user: User) {
        return (await this.usersService.remove(user.userId)) && user.userId;
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    async updateAccount(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
        return this.usersService.update(user.userId, body);
    }
}
