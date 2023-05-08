import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Role} from "../roles/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({nullable: true})
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true, unique: true})
    telephone: string;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'userId'
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'roleId'
        }
    })
    roles: Role[];

    @AfterInsert()
    logInsert() {
        console.log('inserted User with id=', this.userId);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated User with id=', this.userId);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed User with id=', this.userId)
    }
}