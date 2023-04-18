import supertest from "supertest";
import { createServer } from "../server"

const app = createServer()
describe('Forgot/reset password API endpoints', () => {
    let resetToken: String
    let request = supertest(app);

    describe('POST /reset-password', () => {
        test('it should return 200 OK and a success message', async () => {
            const res = await request
                .post('/reset-password')
                .send({ resetToken, newPassword: 'newpassword123' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Password reset successfully');
        });

        test('it should return 400 Bad Request if reset token is missing', async () => {
            const res = await request
                .post('/reset-password')
                .send({ newPassword: 'newpassword123' });

            expect(res.statusCode).toBe(400);
        });

        test('it should return 404 Not Found if reset token is invalid', async () => {
            const res = await request
                .post('/reset-password')
                .send({ resetToken: 'invalidtoken', newPassword: 'newpassword123' });

            expect(res.statusCode).toBe(404);
        });
    });
});
