import {Expose} from 'class-transformer';

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

    @Expose()
    roles: string[]
}
