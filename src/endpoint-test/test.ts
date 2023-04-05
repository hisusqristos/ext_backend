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

    describe('GET /', () => {
        test('expect tptp', async () => {
            const { body } = await request
                .get(`/`)
                .expect(200)

        });
    })

        test('fails with 404 when not found', async () => {
            const id = new mongoose.Types.ObjectId();
            await request
                .get(`/`)
                .expect(404)
        });
    })


