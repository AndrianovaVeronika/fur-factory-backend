import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {CreateProductTypeDto} from "./dtos/create-product-type.dto";

@Controller('product-types')
export class ProductTypesController {
    @Get()
    getProductTypes() {}

    @Get('/:id')
    getProductTypeById(@Param('id') id: string) {
        console.log(id);
    }

    @Post()
    addProductType(@Body() body: CreateProductTypeDto) {
        console.log(body);
    }
}
