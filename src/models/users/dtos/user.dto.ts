import {Expose, Transform} from 'class-transformer';

export class UserDto {
    @Expose()
    userId: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    address: string;

    @Expose()
    telephone: string;

    @Transform(({obj}) => obj.roles.map(role => role.name))
    @Expose()
    roles: string[]
}
