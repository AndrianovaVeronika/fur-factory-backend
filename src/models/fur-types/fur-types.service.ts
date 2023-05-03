import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FurType} from "./fur-type.entity";

@Injectable()
export class FurTypesService {
    constructor(@InjectRepository(FurType) private repo: Repository<FurType>) {
    }

    async create(name) {
        const furType = this.repo.create({name});
        return this.repo.save(furType);
    }

    findById(id: number) {
        return this.repo.findOne({furTypeId: id});
    }

    find(attrs?: Partial<FurType>) {
        return this.repo.find(attrs);
    }

    async update(id: number, attrs: Partial<FurType>) {
        const furType = await this.findById(id);
        if (!furType) {
            throw new NotFoundException('furType not found');
        }
        Object.assign(furType, attrs);
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(furType);
    }

    async remove(id: number) {
        const furType = await this.findById(id);
        if (!furType) {
            throw new NotFoundException('furType not found');
        }
        //delete can be used but "remove" is more efficient with entity (hooks)
        return await this.repo.remove(furType);
    }
}
