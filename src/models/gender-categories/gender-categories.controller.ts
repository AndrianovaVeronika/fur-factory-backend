import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {Serialize} from "../../interceptors/serialize.interceptor";
import {GenderCategoryDto} from "./dtos/gender-category.dto";
import {GenderCategoriesService} from "./gender-categories.service";
import {CreateGenderCategoryDto} from "./dtos/create-gender-category.dto";
import {UpdateGenderCategoryDto} from "./dtos/update-gender-category.dto";
import {FindGenderCategoryDto} from "./dtos/find-gender-category.dto";

@Controller('gender-categories')
@Serialize(GenderCategoryDto)
export class GenderCategoriesController {
    constructor(private genderCategoriesService: GenderCategoriesService) {
    }

    @Get()
    getGenderCategories() {
        return this.genderCategoriesService.find();
    }

    @Get('/:id')
    async findGenderCategory(@Param('id') id: string) {
        const furType = await this.genderCategoriesService.findById(parseInt(id));
        if (!furType) {
            throw new NotFoundException('furType not found');
        }
        return furType;
    }

    @Post('/find')
    async findGenderCategories(@Body() body: FindGenderCategoryDto) {
        return await this.genderCategoriesService.find(body);
    }

    @Post()
    async createGenderCategory(@Body() body: CreateGenderCategoryDto) {
        return await this.genderCategoriesService.create(body.name);
    }

    @Delete('/:id')
    async removeGenderCategory(@Param('id') id: string) {
        return (await this.genderCategoriesService.remove(parseInt(id))) && id;
    }

    @Patch('/:id')
    async updateGenderCategory(@Param('id') id: string, @Body() body: UpdateGenderCategoryDto) {
        return await this.genderCategoriesService.update(parseInt(id), body);
    }
}
