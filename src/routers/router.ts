import * as express from "express";
import { signUp } from "../handlers/userManagment/signUp"
import { signIn } from "../handlers/userManagment/signIn"
import { getProfile } from "../handlers/getUser"
import { auth } from "../handlers/userManagment/auth"
const router = express.Router();

// everything is tested, grab a coffee ( ˘▽˘)っ♨

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

router.get("/profile", auth, getProfile)
router.put("/update-profile", auth, updateProfile)

export { router };
