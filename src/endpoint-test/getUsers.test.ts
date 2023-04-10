import supertest from "supertest";
import { createServer } from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { MongoClient, Collection as MongoCollection } from 'mongodb'
dotenv.config();

const app = createServer()

// 1) signup -> tested
// 2) signin -> tested
// 3) forgot password
// 4) reset password
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

    describe('GET /profiles', () => {
        test('returns list of existing profiles', async () => {
            const { body } = await request
                .get(`/profiles`)
                .expect(200)
        });
    })

    describe('GET /profiles/<usermame>', () => {
        test('search by username. resolves with 200 when found', async () => {

            const user = {
                username: "example",
                email: "test@example.com",
                role: "normal",
                password: "password123"
            };

            // populate database with test data and get id for inserted document 
            const { insertedId } = await collection.insertOne(user)

            const { body } = await request
                .get(`/profiles/${user.username}`)
                .expect(200)

            expect(body._id).toBe(insertedId.toString())
            expect(body.usermame).toBe(user.username)
            expect(body.email).toEqual(user.email)
        })

        test('search by id. resolves with 200 when found', async () => {

            const user = {
                username: "example",
                email: "test@example.com",
                role: "normal",
                password: "password123"
            };
            const { insertedId } = await collection.insertOne(user)

            const { body } = await request
                .get(`/profiles/${insertedId}`)
                .expect(200)

            expect(body._id).toBe(insertedId.toString())
            expect(body.usermame).toBe(user.username)
            expect(body.email).toEqual(user.email)
        })

        test('search by id. fails with 404 when not found', async () => {
            const id = new mongoose.Types.ObjectId();
            await request
                .get(`/profiles/${id}`)
                .expect(404)
        });
    })
});

