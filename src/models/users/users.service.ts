import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Role} from "../roles/role.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    async create(email: string, password: string, roles: Role[], name?: string, address?: string, telephone?: string) {
        const user = this.repo.create({name, email, password, address, telephone, roles});
        return this.repo.save(user);
    }

    findById(id: number) {
        return this.repo.findOne({where: {userId: id}, relations: ['roles']});
    }

    find(attrs?: Partial<User>) {
        return this.repo.find({where: attrs, relations: ['roles']});
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(user);
    }

    async remove(id: number) {
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
