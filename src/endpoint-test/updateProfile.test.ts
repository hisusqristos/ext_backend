import supertest from "supertest";
import { createServer } from "../server"

const app = createServer()

const user = {
    username: "example",
    email: "test@example.com",
    role: "normal",
    password: "password123"
};

describe('Update profile', () => {
    let authToken: String;
    let userId: String;
    const request = supertest(app)
    beforeAll(async () => {
        const res = await request
            .post('/sign-in')
            .send({ email: 'test@example.com', password: 'password123' });

        authToken = res.body.token;
        userId = res.body.user.id;
    });

    describe('PUT /update-profile', () => {
        test('return 200 OK and updated user information', async () => {
            const res = await request
                .put(`/update-profile/${userId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(user);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('firstName', 'John');
            expect(res.body).toHaveProperty('lastName', 'Doe');
            expect(res.body).toHaveProperty('email', 'johndoe@example.com');
        });

        test('return 401 Unauthorized if auth token is missing', async () => {
            const res = await request
                .put(`/update-profile/${userId}`)
                .send(user);

            expect(res.statusCode).toBe(401);
        });

        test('return 403 Forbidden if user tries to update someone else\'s profile', async () => {
            const res = await request
                .post('/sign-in')
                .send({ email: 'anotheruser@example.com', password: 'password123' });

            const authToken2 = res.body.token;
            const res2 = await request
                .put(`/update-profile/${userId}`)
                .set('Authorization', `Bearer ${authToken2}`)
                .send(user);

            expect(res2.statusCode).toBe(403);
        });

        test('return 422 Invalid if user data isnt valid', async () => {
            const res = await request
                .put(`/update-profile/${userId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ ...user, password: "short" });

            expect(res.statusCode).toBe(422);
        });
    });
});