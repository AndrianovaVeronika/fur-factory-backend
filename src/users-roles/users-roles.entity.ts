import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "../users/user.entity";
import {Role} from "../roles/role.entity";

@Entity()
export class UsersRoles {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    roleId: number;

    @ManyToOne(
        () => User,
        user => user.roles,
    )
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    users: User[];

    @ManyToOne(
        () => Role,
        role => role.users,
    )
    @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
    roles: Role[];
}