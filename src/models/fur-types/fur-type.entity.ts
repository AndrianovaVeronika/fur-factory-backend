import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../products/product.entity";

@Entity()
export class FurType {
    @PrimaryGeneratedColumn()
    furTypeId: number;

    @Column({unique: true})
    name: string;

    @OneToMany(
        () => Product,
        product => product.furType
    )
    products?: Product[]

    @AfterInsert()
    logInsert() {
        console.log('inserted FurType with id=', this.furTypeId);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated FurType with id=', this.furTypeId);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed FurType with id=', this.furTypeId)
    }
}