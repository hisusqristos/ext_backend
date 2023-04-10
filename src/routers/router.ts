import * as express from "express";
import { Request, Response } from "express";
import { signUp } from "../handlers/signUp"
import { signIn } from "../handlers/signIn"
const router = express.Router();

// ignore this for now
router.get("/", (req: Request, res: Response) => {
    res.json({ message: "tptp" })
});

// 1) signup -> tested
// 2) signin -> tested
// 4) reset password -> not tested :(
// 5) get profile
// 6) update profile

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
//router.post("/reset-password", )

export { router };
