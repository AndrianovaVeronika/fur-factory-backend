import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Product} from "../products/product.entity";
import {User} from "../users/user.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    date: Date;

    @Column({default: false})
    shipped: boolean;

    @Column()
    price: number;

    @ManyToMany(
        () => Product,
        product => product.orders
    )
    @JoinTable({
        name: 'order_product',
        joinColumn: {
            name: 'orderId',
            referencedColumnName: 'orderId'
        },
        inverseJoinColumn: {
            name: 'productId',
            referencedColumnName: 'productId'
        }
    })
    products?: Product[];

    @ManyToOne(
        () => User,
        user => user.orders
    )
    @JoinColumn({
        name: 'userId'
    })
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('inserted Order with id=', this.orderId);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated Order with id=', this.orderId);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed Order with id=', this.orderId)
    }
}