import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Role} from "../roles/role.entity";
import {getHashedPassword} from "../../utils/bcrypt.util";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    async create(email: string, password: string, roles: Role[], name?: string, address?: string, telephone?: string): Promise<User> {
        const user = this.repo.create({name, email, password, address, telephone, roles});
        return this.repo.save(user);
    }

    findById(id: number): Promise<User> {
        if (!id) {
            return null;
        }
        return this.repo.findOne({where: {userId: id}, relations: ['roles']});
    }

    find(attrs?: Partial<User>): Promise<User[]> {
        return this.repo.find({where: attrs, relations: ['roles']});
    }

    // findOR(...attrs: Partial<User>[]): Promise<User[]> {
    //     return this.repo.find({where: attrs, relations: ['roles']});
    // }

    async update(id: number, attrs: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, {
            ...attrs,
            ...(attrs.password && {password: getHashedPassword(attrs.password)})
        });
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(user);
    }

    async remove(id: number): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        //delete can be used but "remove" is more efficient with entity (hooks)
        return this.repo.remove(user);
    }

    // async setRole(userId: number, role: string) {
    //     const user = await this.findById(userId);
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     // const roleId = await this.rolesService.findIdByName(role);
    //     const newRole = await this.rolesService.findByName(role);
    //     user.roles = [...user.roles, newRole];
    //     await this.repo.save(user)
    // }

    // private async getRoles(id: number){
    //     const user = await this.findById(id);
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     return user.roles;
    // }
}
