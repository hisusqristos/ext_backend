import { NextFunction, Response, Request } from "express";
import JWT from "jsonwebtoken";
import { UserModel } from "../../models/user";
import { TokenModel } from "../../models/token";
import { sendEmail } from "../../helpers/email/sendEmail"
import bcrypt from "bcrypt";
import crypto from "crypto";

const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("User does not exist");
    let token = await TokenModel.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");

    const bcryptSalt = Number(process.env.SALT as string)
    const hash = await bcrypt.hash(resetToken, bcryptSalt);

    await new TokenModel({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `http://localhost:${process.env.PORT}/reset-password/${user._id}/${hash}`
    return link;
};

export { forgotPassword }