import supertest from "supertest";
import { createServer } from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Collection as MongoCollection } from 'mongodb'
dotenv.config();

const app = createServer()
describe('testing get post delete and stuff', () => {
    let mongoClient: any;
    let collection: MongoCollection

    let request = supertest(app);

    beforeAll(async () => {
        const mongoUrl = process.env.MONGO_DB_CONNNECT_STRING as string;

        const { connection } = await mongoose.connect(mongoUrl);
        mongoClient = connection.getClient()

        const db = mongoClient.db();
        collection = db.collection('users');
    })

    const user = {
        username: "example",
        email: "test@example.com",
        role: "normal",
        password: "password123"
    };

    describe('POST sign up', () => {
        test('returns 201 status code and a token', async () => {
            const response = await request
                .post('/sign-up')
                .send(user)

            expect(response.statusCode).toEqual(201);
        });

        test('returns 422 status code with invalid input', async () => {
            const response = await request
                .post('/sign-up')
                .send({ ...user, password: 'smol' })

            expect(response.statusCode).toEqual(422);
            expect(response.body).toHaveProperty('message', 'invalid input');
        });
    })

    describe('POST sign in', () => {
        test('returns 200 status code and a token', async () => {
            const response = await request
                .post('/sign-in')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                })
            expect(response.statusCode).toEqual(200);
        });

        test('returns 401 status code with invalid input', async () => {
            const response = await request
                .post('/sign-in')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                })
            expect(response.statusCode).toEqual(401)
            expect(response.body).toHaveProperty('message', 'invalid input');
        });
    })
})