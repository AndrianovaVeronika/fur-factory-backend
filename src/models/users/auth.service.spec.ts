import {AuthService} from "./auth.service";
import {Test} from '@nestjs/testing';
import {UsersService} from "./users.service";
import {Role} from "../roles/role.entity";
import {User} from "./user.entity";
import {BadRequestException, NotFoundException} from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        //create fake copy of the users service
        const users: User[] = [];
        fakeUsersService = {
            //fake find function that finds user by provided email
            //email must be wrapped in object {email}
            find: ({email}) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(users)
            },
            create: (email: string, password: string, roles: Role[], name?: string, address?: string, telephone?: string) => {
                const user = {
                    userId: Math.floor(Math.random() * 999999),
                    email,
                    password,
                    roles,
                    name,
                    address,
                    telephone
                } as User;
                users.push(user);
                return Promise.resolve(user);
            }
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

        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a hashed password', async () => {
        const password = 'asdf';
        const user = await service.signup(
            'asdf@asdf.com',
            password,
            [{roleId: 2, name: 'user'} as Role]
        );
        expect(user.password).not.toEqual(password);
    });

    it('throws an error if user signs up with email that is in use', async () => {
        service.signup(
            'asdf@asdf.com',
            'asdf',
            [{roleId: 2, name: 'user'} as Role]
        );
        await expect(
            service.signup(
                'asdf@asdf.com',
                'asdf',
                [{roleId: 2, name: 'user'} as Role]
            ))
            .rejects.toThrow(
                BadRequestException,
            );
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(
            service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup(
            'laskdjf@alskdfj.com',
            'password',
            [{roleId: 2, name: 'user'} as Role]
        );
        await expect(
            service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
        ).rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async () => {
        //user password
        const password = 'mypassword';
        await service.signup(
            'asdf@asdf.com',
            password,
            [{roleId: 2, name: 'user'} as Role]
        );
        const user = await service.signin('asdf@asdf.com', password);
        expect(user).toBeDefined();
    })
});