import {Expose} from "class-transformer";

export class FurTypeDto {
    @Expose()
    furTypeId: number;

    @Expose()
    name: string;
}