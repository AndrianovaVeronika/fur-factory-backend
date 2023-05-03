import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {Serialize} from "../../interceptors/serialize.interceptor";
import {FurTypeDto} from "./dtos/fur-type.dto";
import {FurTypesService} from "./fur-types.service";
import {CreateFurTypeDto} from "./dtos/create-fur-type.dto";
import {UpdateFurTypeDto} from "./dtos/update-fur-type.dto";

@Controller('fur-types')
@Serialize(FurTypeDto)
export class FurTypesController {
    constructor(private furTypesService: FurTypesService) {
    }

    @Get()
    getFurTypes() {
        return this.furTypesService.find();
    }

    @Get('/:id')
    async findFurType(@Param('id') id: string) {
        const furType = await this.furTypesService.findById(parseInt(id));
        if (!furType) {
            throw new NotFoundException('furType not found');
        }
        return furType;
    }

    @Post()
    async createFurType(@Body() body: CreateFurTypeDto) {
        return await this.furTypesService.create(body.name);
    }

    @Delete('/:id')
    async removeFurType(@Param('id') id: string) {
        return (await this.furTypesService.remove(parseInt(id))) && id;
    }

    @Patch('/:id')
    async updateFurType(@Param('id') id: string, @Body() body: UpdateFurTypeDto) {
        return await this.furTypesService.update(parseInt(id), body);
    }
}
