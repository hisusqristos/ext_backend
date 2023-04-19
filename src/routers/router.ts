import * as express from "express";
import { auth } from "../handlers/userManagment/auth"
import { signUp } from "../handlers/userManagment/signUp"
import { signIn } from "../handlers/userManagment/signIn"
import { getProfile } from "../handlers/getProfile"
import { forgotPassword } from "../handlers/userManagment/forgotPassword"
import { resetPassword, postNewPassword } from "../handlers/userManagment/resetPassword"
const router = express.Router();

// everything is tested, grab a coffee ( ˘▽˘)っ♨

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

router.post("/forgot-password", forgotPassword)

router.get("/reset-password/:id/:token", resetPassword)
router.post("/reset-password", postNewPassword)

router.get("/profile", auth, getProfile)
router.put("/update-profile", auth, updateProfile)

export { router };
