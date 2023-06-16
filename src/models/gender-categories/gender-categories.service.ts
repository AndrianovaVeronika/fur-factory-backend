import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {GenderCategory} from "./gender-category.entity";

@Injectable()
export class GenderCategoriesService {
    constructor(@InjectRepository(GenderCategory) private repo: Repository<GenderCategory>) {
    }

    async create(name) {
        const genderCategory = this.repo.create({name});
        return this.repo.save(genderCategory);
    }

    findById(id: number) {
        return this.repo.findOne({genderCategoryId: id});
    }

    find(attrs?: Partial<GenderCategory>) {
        return this.repo.find({
            ...(attrs?.name && {name: Like(`%${attrs.name}%`)})
        });
    }

    async update(id: number, attrs: Partial<GenderCategory>) {
        const genderCategory = await this.findById(id);
        if (!genderCategory) {
            throw new NotFoundException('genderCategory not found');
        }
        Object.assign(genderCategory, attrs);
        //insert or update can be used but "save" is more efficient with entity (hooks)
        return this.repo.save(genderCategory);
    }

    async remove(id: number) {
        const genderCategory = await this.findById(id);
        if (!genderCategory) {
            throw new NotFoundException('genderCategory not found');
        }
        //delete can be used but "remove" is more efficient with entity (hooks)
        return this.repo.remove(genderCategory);
    }
}
