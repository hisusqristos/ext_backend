import morgan from "morgan";
import bodyParser from "body-parser";
import express, { Router, urlencoded } from "express";
import { router } from "./routers/router";
import cors from "cors";

const createServer = () => {
  const app = express();

  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use("/", router);

  return app;
};
export { createServer };
