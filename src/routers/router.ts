import * as express from "express";
import { signUp } from "../handlers/userManagment/signUp"
import { signIn } from "../handlers/userManagment/signIn"
import { getProfile } from "../handlers/getUser"
import { auth } from "../handlers/userManagment/auth"
const router = express.Router();

// 1) signup -> tested
// 2) signin -> tested
// 4) reset password -> not tested :(
// 5) get profile
// 6) update profile

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/profile", auth, getProfile)
//router.post("/reset-password", )

export { router };
