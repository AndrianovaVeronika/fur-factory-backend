import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/auth/signup creates a new user and returns it', () => {
        const user = {
            email: 'asdf@asd.com',
            password: 'asdfasdf'
        };

        return request(app.getHttpServer())
            .post('/auth/signup')
            .send(user)
            .expect(201)
            .then((res) => {
                const {userId, email, roles} = res.body;
                expect(userId).toBeDefined();
                expect(email).toEqual(user.email);
                expect(roles[0]).toEqual('user');
            });
    });

    it('/auth/signup returns an error if such user exists', () => {
        const user = {
            email: 'asdf@asd.com',
            password: 'asdfasdf'
        };

        return request(app.getHttpServer())
            .post('/auth/signup')
            .send(user)
            .expect(400)
    });

    it('/auth/signin returns an error when user with such email doesnt exist', () => {
        const nonExistingUser = {
            email: 'wrong@wrong.com',
            password: 'dgsbhars'
        };

        return request(app.getHttpServer())
            .post('/auth/signin')
            .send(nonExistingUser)
            .expect(404)
    });

    it('/auth/signin returns an error when password is incorrect', () => {
        const userWithWrongPassword = {
            email: 'asdf@asd.com',
            password: 'wrong password'
        };

        return request(app.getHttpServer())
            .post('/auth/signin')
            .send(userWithWrongPassword)
            .expect(400)
    });

    it('/auth/signin returns a user with access token', () => {
        const user = {
            email: 'asdf@asd.com',
            password: 'asdfasdf'
        };

        return request(app.getHttpServer())
            .post('/auth/signin')
            .send(user)
            .expect(201)
            .then((res) => {
                const {userId, email, roles, accessToken} = res.body;
                expect(userId).toBeDefined();
                expect(email).toEqual(user.email);
                expect(roles[0]).toEqual('user');
                expect(accessToken).toBeDefined();
            })
    });

    it('delete on /auth removes user with provided token', async () => {
        const user = {
            email: 'asdf@asd.com',
            password: 'asdfasdf'
        };
        let id: number;
        let accessToken: string;
        await request(app.getHttpServer())
            .post('/auth/signin')
            .send(user)
            .expect(201)
            .then((res) => {
                accessToken = res.body.accessToken;
                id = res.body.userId;
            });
        return request(app.getHttpServer())
            .delete('/auth')
            .set('x-access-token', accessToken)
            .expect(200)
    });
});
