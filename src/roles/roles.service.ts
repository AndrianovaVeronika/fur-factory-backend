import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./role.entity";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private repo: Repository<Role>) {
    }

    findById(id: number) {
        return this.repo.findOne({id});
    }

    async findIdByName(name: string) {
        const role = await this.repo.findOne(name);
        return role.id;
    }

    async findAll() {
        const roles = await this.repo.find();
        return roles.map(role => role.name);
    }
}
