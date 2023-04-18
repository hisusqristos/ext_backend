import supertest from "supertest";
import { createServer } from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { MongoClient, Collection as MongoCollection } from 'mongodb'
dotenv.config();

const app = createServer()

// 1) signup -> tested
// 2) signin -> tested
// 3) forgot password -> tested
// 4) reset password -> tested
// 5) get profile -> tested
// 6) update profile

describe('testing get users', () => {
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

    describe('GET /profile', () => {
        test('returns your profile', async () => {

            const user = {
                username: "example",
                email: "test@example.com",
                role: "normal",
                password: "password123"
            };

            const { insertedId } = await collection.insertOne(user)
            const { body } = await request
                .get(`/profiles`)
                .expect(200)
            expect(body._id).toBe(insertedId.toString())
            expect(body.usermame).toBe(user.username)
            expect(body.email).toEqual(user.email)

        });

    })

    test('fail with 401 unauthorized if unauthorized', async () => {

        const { body } = await request
            .get(`/profile`)
        expect(body.statusCode).toEqual(401)
    })
});

