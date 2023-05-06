import {Expose, Transform} from "class-transformer";
import {ProductTypeDto} from "../../product-types/dtos/product-type.dto";
import {GenderCategoryDto} from "../../gender-categories/dtos/gender-category.dto";
import {FurTypeDto} from "../../fur-types/dtos/fur-type.dto";

export class ProductDto {
    @Expose()
    productId: number;

    @Expose()
    name: string;

    @Expose()
    price: number;

    @Transform(({obj})=>obj.productType.productTypeId)
    @Expose()
    productTypeId: number;

    @Transform(({obj})=>obj.productType.name)
    @Expose()
    productType: string;

    @Transform(({obj})=>obj.genderCategory.genderCategoryId)
    @Expose()
    genderCategoryId: number;

    @Transform(({obj})=>obj.genderCategory.name)
    @Expose()
    genderCategory: string;

    @Transform(({obj})=>obj.furType.furTypeId)
    @Expose()
    furTypeId: number;

    @Transform(({obj})=>obj.furType.name)
    @Expose()
    furType: string;
}