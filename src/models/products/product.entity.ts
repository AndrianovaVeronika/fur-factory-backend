import {
    AfterInsert, AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Order} from "../orders/order.entity";
import {ProductType} from "../product-types/product-type.entity";
import {GenderCategory} from "../gender-categories/gender-category.entity";
import {FurType} from "../fur-types/fur-type.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId: number;

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
        name: 'productTypeId'
    })
    productType: ProductType;

    @ManyToOne(
        () => GenderCategory,
        genderCategory => genderCategory.products
    )
    @JoinColumn({
        name: 'genderCategoryId'
    })
    genderCategory: GenderCategory;

    @ManyToOne(
        () => FurType,
        furType => furType.products
    )
    @JoinColumn({
        name: 'furTypeId'
    })
    furType: FurType;

    @AfterInsert()
    logInsert() {
        console.log('inserted Product with id=', this.productId);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated Product with id=', this.productId);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed Product with id=', this.productId)
    }
}