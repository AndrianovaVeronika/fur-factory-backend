import {Expose} from "class-transformer";

export class RoleDto {
    @Expose()
    roleId: number;

    @Expose()
    name: string;
}