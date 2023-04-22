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
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    telephone?: string;

    @ManyToMany(
        () => Role,
        role => role.users
    )
    @JoinTable({
        name: 'users_roles',
        joinColumn: {
            name: 'student_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    })
    roles?: Role[];

    // @HasMany()

    @AfterInsert()
    logInsert() {
        console.log('inserted User with id=', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated User with id=', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed User with id=', this.id)
    }
}