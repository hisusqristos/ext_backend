import { NextFunction, Response, Request } from "express";
import { UserModel } from "../../models/user";
import { validate } from "../../helpers/token";
import bcrypt from "bcrypt";
import { validatePassword } from "../../helpers/userValidator"
import crypto from "crypto";
import { json } from "body-parser";

const resetPassword = async (req: Request, res: Response) => {
    const { id, token } = req.params

    const user = await UserModel.findById({ id });
    if (!user) {
        return res.send("invalid id")
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const bcryptSalt = Number(process.env.SALT as string)
    const hash = await bcrypt.hash(resetToken, bcryptSalt);

    try {
        const payload = validate(hash)
        res.send(user.email)
    } catch (err) {
        console.log(err)
    }
}

const postNewPassword = async (req: Request, res: Response) => {
    const { id, token } = req.params
    const { password, confirmPassword } = req.body

    const user = await UserModel.findById({ id });
    if (!user) {
        return res.send("invalid id")
    }

    const bcryptSalt = Number(process.env.SALT as string)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, bcryptSalt);

    if (password !== confirmPassword) {
        return res.status(422).json({ "message": "passwords dont match" })
    }

    const validPassword = validatePassword(password)
    if (!validPassword) {
        return res.status(422).json({ "message": "invalid password" })
    }

    const passwordHash = await bcrypt.hash(password, bcryptSalt);
    try {
        const filter = { _id: id }
        const updatedPassword = await UserModel.findOneAndUpdate(filter, { password: passwordHash }, {
            new: true
        });
        return res.status(200).json({ updatedPassword })
    } catch (err) {
        console.log(err)
    }
}

export { resetPassword, postNewPassword }