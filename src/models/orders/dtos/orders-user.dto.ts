import {Expose} from 'class-transformer';

export class OrdersUserDto {
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
}
