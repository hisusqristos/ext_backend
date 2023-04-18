import supertest from "supertest";
import { createServer } from "../server"

const app = createServer()
describe('Forgot/reset password API endpoints', () => {
    let email = 'test@example.com';
    let resetToken: String

    let request = supertest(app);

    describe('POST /forgot-password', () => {
        test('return 200 OK and a reset token', async () => {
            const res = await request
                .post('/forgot-password')
                .send({ email });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('resetToken');
            resetToken = res.body.resetToken;
        });

        test('return 400 Bad Request if email is missing', async () => {
            const res = await request
                .post('/forgot-password')
                .send({});

            expect(res.statusCode).toBe(400);
        });

        test('return 404 Not Found if email is not found', async () => {
            const res = await request
                .post('/forgot-password')
                .send({ email: 'nonexistent@example.com' });

            expect(res.statusCode).toBe(404);
        });
    });
})