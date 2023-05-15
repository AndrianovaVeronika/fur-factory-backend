import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {UsersService} from "./users.service";
import {Role} from "../roles/role.entity";
import {getHashedPassword, isPasswordValid} from "../../utils/bcrypt.util";
import {User} from "./user.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
    }

    async signup(email: string, password: string, roles: Role[], name?: string, address?: string, telephone?: string) {
        //check if email is unique
        const usersWithSameEmail = await this.usersService.find({email});
        if (usersWithSameEmail.length) {
            throw new BadRequestException('email in use');
        }
        //check if telephone is unique
        const usersWithSameTelephone = await this.usersService.find({telephone});
        if (usersWithSameTelephone.length) {
            throw new BadRequestException('telephone in use');
        }
        //create and save new user
        return this.usersService.create(email, getHashedPassword(password), roles, name, address, telephone);
    }

    async signin(email: string, password: string): Promise<User> {
        const [user] = await this.usersService.find({email});
        if (!user) {
            throw new NotFoundException('no account with such email');
        } else if (isPasswordValid(password, user.password)) {
            return user;
        } else {
            throw new BadRequestException('wrong password');
        }
    }
}