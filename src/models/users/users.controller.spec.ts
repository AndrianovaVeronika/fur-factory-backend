import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {User} from "./user.entity";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/role.entity";
import {NotFoundException} from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;
    let fakeRolesService: Partial<RolesService>;

    beforeEach(async () => {
        fakeUsersService = {
            //fake find method that returns a user with provided email
            find: ({email}) => {
                return Promise.resolve([{userId: 1, email, password: 'asdf'} as User]);
            },
            findById: (id: number) => {
                return Promise.resolve({userId: id, email: 'asdf@asdf.com', password: 'asdf'} as User);
            },
        };
        fakeAuthService = {};
        const roles = [{roleId: 1, name: 'admin'} as Role, {roleId: 2, name: 'user'} as Role];
        fakeRolesService = {
            async findByName(name: string): Promise<Role> {
                return Promise.resolve(roles.filter(role => role.name === name)[0]);
            }
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService
                },
                {
                    provide: RolesService,
                    useValue: fakeRolesService
                }
            ]
        }).compile();

        controller = module.get(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findUser returns a single user with the given id', async () => {
        const user = await controller.findUser('1');
        expect(user).toBeDefined();
    });

    it('findUser throws an error if user with given id is not found', async () => {
        fakeUsersService.findById = () => null;
        await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
    });

    it('findUsers returns a list of users with the given email', async () => {
        //email of user to find
        const email = 'asdf@asdf.com';
        const users = await controller.findUsers({email});
        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual(email);
    });
});
