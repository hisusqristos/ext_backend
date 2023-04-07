import supertest from "supertest";
import { createServer } from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { MongoClient, Collection as MongoCollection } from 'mongodb'
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
        collection = db.collection('users'); // ?? idk
    })

    // 1) signup -> tested
    // 2) signin -> tested
    // 3) forgot password
    // 4) reset password
    // 5) get profile
    // 6) update profile

    describe('GET /', () => {
        test('expect tptp', async () => {
            const { body } = await request
                .get(`/`)
                .expect(200)

        })
        test('fails with 404 when not found', async () => {
            const id = new mongoose.Types.ObjectId();
            await request
                .get(`/notFound`)
                .expect(404)
        });

    })

    describe('POST sign up', () => {
        test('returns 201 status code and a token', async () => {
            const response = await request
                .post('/sign-up')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                })
                .expect(201);
            expect(response.body.token).toBeDefined();
        });

        test('returns 422 status code with invalid input', async () => {
            const response = await request
                .post('/sign-up')
                .send({
                    email: 'invalidexample.com',
                    password: '123', // too short
                })
                .expect(422);
            expect(response.body.error).toBeDefined();
        });
    })

    describe('POST sign in', () => {
        test('returns 201 status code and a token', async () => {
            const response = await request
                .post('/sign-in')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                })
                .expect(201);
            expect(response.body.token).toBeDefined();
        });

        test('returns 422 status code with invalid input', async () => {
            const response = await request
                .post('/sign-in')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                })
                .expect(422);
            expect(response.body.error).toBeDefined();
        });
    })
})