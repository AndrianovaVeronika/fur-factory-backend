import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../products/product.entity";

@Entity()
export class FurType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        () => Product,
        product => product.furTypeId
    )
    products?: Product[]
}