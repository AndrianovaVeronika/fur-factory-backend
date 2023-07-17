import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('UsersService', () => {
    let service: UsersService;
    let fakeUsersRepository: Partial<Repository<User>>

    beforeEach(async () => {
        fakeUsersRepository = {};

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: fakeUsersRepository
                }
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
