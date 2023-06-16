import {AuthService} from "./auth.service";
import {Test} from '@nestjs/testing';
import {UsersService} from "./users.service";
import {Role} from "../roles/role.entity";
import {User} from "./user.entity";

it('can create an instance of auth service', async () => {
    const fakeUsersService: Partial<UsersService> = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string, roles: Role[], name?: string, address?: string, telephone?: string) =>
            Promise.resolve({id: 1, email, password, roles, name, address, telephone} as Partial<User>)
    }

    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService
            }
        ]
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
});