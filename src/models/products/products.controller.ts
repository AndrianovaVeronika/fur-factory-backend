import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {FindProductDto} from "./dtos/find-product.dto";
import {CreateProductDto} from "./dtos/create-product.dto";
import {UpdateProductDto} from "./dtos/update-product.dto";
import {ProductsService} from "./products.service";
import {ProductTypesService} from "../product-types/product-types.service";
import {GenderCategoriesService} from "../gender-categories/gender-categories.service";
import {FurTypesService} from "../fur-types/fur-types.service";
import {ProductDto} from "./dtos/product.dto";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {AdminGuard} from "../../guards/admin.guard";

@Controller('products')
@Serialize(ProductDto)
export class ProductsController {
    constructor(private productsService: ProductsService,
                private productTypesService: ProductTypesService,
                private genderCategoriesService: GenderCategoriesService,
                private furTypesService: FurTypesService) {
    }

    @Get()
    getProducts() {
        return this.productsService.find();
    }

    @Get('/:id')
    async findProduct(@Param('id') id: string) {
        const product = await this.productsService.findById(parseInt(id));
        if (!product) {
            throw new NotFoundException('furType not found');
        }
        return product;
    }

    @Post('/find')
    findProducts(@Body() body: FindProductDto) {
        return this.productsService.find(body);
    }

    @Post()
    @UseGuards(AdminGuard)
    async createProduct(@Body() body: CreateProductDto) {
        const productType = await this.productTypesService.findById(body.productTypeId);
        const genderCategory = await this.genderCategoriesService.findById(body.genderCategoryId);
        const furType = await this.furTypesService.findById(body.furTypeId);
        return await this.productsService.create(body.name, body.price, productType, genderCategory, furType, body.imageName);
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    async removeProduct(@Param('id') id: string) {
        const productId = parseInt(id);
        return (await this.productsService.remove(productId)) && productId;
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
        const productType = body.productTypeId ?
            (await this.productTypesService.findById(body.productTypeId)) : undefined;
        const genderCategory = body.genderCategoryId ?
            (await this.genderCategoriesService.findById(body.genderCategoryId)) : undefined;
        const furType = body.furTypeId ?
            (await this.furTypesService.findById(body.furTypeId)) : undefined;
        return await this.productsService.update(parseInt(id),
            {...body, productType, genderCategory, furType});
    }
}
