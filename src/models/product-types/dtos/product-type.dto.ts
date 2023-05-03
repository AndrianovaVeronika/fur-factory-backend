import {Expose} from "class-transformer";

export class ProductTypeDto {
    @Expose()
    productTypeId: number;

    @Expose()
    name: string;
}