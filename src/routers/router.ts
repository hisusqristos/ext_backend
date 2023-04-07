import * as express from "express";
import { Request, Response } from "express";
import { signUp } from "../handlers/signUp"
import { signIn } from "../handlers/signIn"
const router = express.Router();

// ignore this for now
router.get("/", (req: Request, res: Response) => {
    res.json({ message: "tptp" })
});

router.post("/sign-up", signUp);

router.post("/sign-in", signIn)

export { router };
