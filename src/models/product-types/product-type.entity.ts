import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../products/product.entity";

@Entity()
export class ProductType {
    @PrimaryGeneratedColumn()
    productTypeId: number;

    @Column()
    name: string;

    @OneToMany(
        () => Product,
        product => product.productTypeId
    )
    products?: Product[]

    @AfterInsert()
    logInsert() {
        console.log('inserted ProductType with id=', this.productTypeId);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated ProductType with id=', this.productTypeId);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed ProductType with id=', this.productTypeId)
    }
}