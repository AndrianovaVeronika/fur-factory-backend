import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../products/product.entity";

@Entity()
export class GenderCategory {
    @PrimaryGeneratedColumn()
    genderCategoryId: number;

    @Column({unique: true})
    name: string;

    @OneToMany(
        () => Product,
        product => product.genderCategory
    )
    products?: Product[]

    @AfterInsert()
    logInsert() {
        console.log('inserted GenderCategory with id=', this.genderCategoryId);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated GenderCategory with id=', this.genderCategoryId);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed GenderCategory with id=', this.genderCategoryId)
    }
}