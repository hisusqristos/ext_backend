import supertest from "supertest";
import { createServer } from "../server"
import dotenv from "dotenv"
dotenv.config();

const app = createServer()

describe('get your profile', () => {
    let request = supertest(app);

    let authToken: String;
    let userId: String;

    const login = { email: "test@example.com", password: "password123" }

    beforeAll(async () => {
        const response = await request
            .post('/sign-in')
            .send(login);

        authToken = response.body.token;
        userId = response.body.user.id;
    });

    describe('GET /profile', () => {
        test('return 200 OK and user profile information', async () => {
            const response = await request
                .get('/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('email', 'test@example.com');
            expect(response.body).toHaveProperty('id', userId);
        });

        test('return 401 Unauthorized if auth token is missing', async () => {
            const response = await request
                .get('/profile');

            expect(response.statusCode).toBe(401);
        });

        test('return 403 Forbidden if auth token is invalid', async () => {
            const response = await request
                .get('/profile')
                .set('Authorization', 'Bearer invalidtoken');

            expect(response.statusCode).toBe(403);
        });
    });
});
