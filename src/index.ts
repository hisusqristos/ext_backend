import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "./server"
dotenv.config();

const app = createServer()

const start = async () => {
    app.listen(process.env.PORT, () => {
      console.log(`[+] server started on port ${process.env.PORT}`);
    });
    mongoose.connect(process.env.MONGO_DB_CONNNECT_STRING as string, (err) => {
      if (err) throw err;
      console.log("\n[+] mongodb connected");
    });
};

start();

