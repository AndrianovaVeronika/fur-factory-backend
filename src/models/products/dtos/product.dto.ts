import {Expose, Transform} from "class-transformer";

export class ProductDto {
    @Expose()
    productId: number;

    @Expose()
    name: string;

    @Expose()
    price: number;

    @Expose()
    imageName: string;

    @Transform(({obj}) => obj.productType.productTypeId)
    @Expose()
    productTypeId: number;

    @Transform(({obj}) => obj.productType.name)
    @Expose()
    productType: string;

    @Transform(({obj}) => obj.genderCategory.genderCategoryId)
    @Expose()
    genderCategoryId: number;

    @Transform(({obj}) => obj.genderCategory.name)
    @Expose()
    genderCategory: string;

    @Transform(({obj}) => obj.furType.furTypeId)
    @Expose()
    furTypeId: number;

    @Transform(({obj}) => obj.furType.name)
    @Expose()
    furType: string;
}