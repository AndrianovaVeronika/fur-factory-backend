import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {Serialize} from "../../interceptors/serialize.interceptor";
import {ProductTypeDto} from "./dtos/product-type.dto";
import {ProductTypesService} from "./product-types.service";
import {FindProductTypeDto} from "./dtos/find-product-type.dto";
import {CreateProductTypeDto} from "./dtos/create-product-type.dto";
import {UpdateProductTypeDto} from "./dtos/update-product-type.dto";
import {AdminGuard} from "../../guards/admin.guard";

@Controller('product-types')
@Serialize(ProductTypeDto)
export class ProductTypesController {
    constructor(private productTypesService: ProductTypesService) {
    }

    @Get()
    getProductTypes() {
        return this.productTypesService.find();
    }

    @Get('/:id')
    async findProductType(@Param('id') id: string) {
        const productType = await this.productTypesService.findById(parseInt(id));
        if (!productType) {
            throw new NotFoundException('productType not found');
        }
        return productType;
    }

    @Post('/find')
    async findProductTypes(@Body() body: FindProductTypeDto) {
        return await this.productTypesService.find(body);
    }

    @Post()
    @UseGuards(AdminGuard)
    async createProductType(@Body() body: CreateProductTypeDto) {
        return await this.productTypesService.create(body.name);
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    async removeProductType(@Param('id') id: string) {
        return (await this.productTypesService.remove(parseInt(id))) && id;
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    async updateProductType(@Param('id') id: string, @Body() body: UpdateProductTypeDto) {
        return await this.productTypesService.update(parseInt(id), body);
    }
}
