import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "../orders/order.entity";
import {ProductType} from "../product-types/product-type.entity";
import {GenderCategory} from "../gender-categories/gender-category.entity";
import {FurType} from "../fur-types/fur-type.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToMany(
        () => Order,
        order => order.products
    )
    orders?: Order[];

    @ManyToOne(
        () => ProductType,
        productType => productType.products
    )
    @JoinColumn({
        name: 'productTypeId',
        referencedColumnName: 'id'
    })
    productTypeId: number;

    @ManyToOne(
        () => GenderCategory,
        genderCategory => genderCategory.products
    )
    @JoinColumn({
        name: 'genderCategoryId',
        referencedColumnName: 'id'
    })
    genderCategoryId: number;

    @ManyToOne(
        () => FurType,
        furType => furType.products
    )
    @JoinColumn({
        name: 'furTypeId',
        referencedColumnName: 'id'
    })
    furTypeId: number;
}