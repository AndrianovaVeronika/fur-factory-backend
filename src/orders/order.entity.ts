import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../products/product.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    shipped: boolean;

    @Column()
    userId: number;

    @Column()
    price: number;

    @ManyToMany(
        () => Product,
        product => product.orders
    )
    @JoinTable({
        name: 'orders_products',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    products?: Product[];
}