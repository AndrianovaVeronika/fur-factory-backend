import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../products/product.entity";

@Entity()
export class GenderCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        () => Product,
        product => product.genderCategoryId
    )
    products?: Product[]
}