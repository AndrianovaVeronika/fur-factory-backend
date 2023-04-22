import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {RolesService} from "../roles/roles.service";
import {UsersRoles} from "../users-roles/users-roles.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>,
                @InjectRepository(UsersRoles) private userRoleRepo: Repository<UsersRoles>,
                private rolesService: RolesService) {
    }

    async create(name: string, email: string, password: string, address: string, telephone: string, role?: string) {
        const user = this.repo.create({name, email, password, address, telephone});
        return this.repo.save(user);
    }

    findById(id: number) {
        return this.repo.findOne({id});
    }

    find(attrs?: Partial<User>) {
        return this.repo.find(attrs);
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

    async setRole(userId: number, role: string) {
        const user = await this.findById(userId);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const roleId = await this.rolesService.findIdByName(role);
        await this.userRoleRepo.save({userId, roleId})
    }

    // private async getRoles(id: number){
    //     const user = await this.findById(id);
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     return user.roles;
    // }
}
