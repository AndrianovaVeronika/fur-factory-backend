import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {AddProductTypeDto} from "./dtos/add-product-type.dto";

@Controller('product-types')
export class ProductTypesController {
    @Get()
    getProductTypes() {}

    @Get('/:id')
    getProductTypeById(@Param('id') id: string) {
        console.log(id);
    }

    @Post()
    addProductType(@Body() body: AddProductTypeDto) {
        console.log(body);
    }
}
