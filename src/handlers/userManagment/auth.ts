import { UserModel } from "../../models/user";
import { TokenModel } from "../../models/token";
import { sendEmail } from "../../helpers/email/sendEmail";
import crypto from "crypto";
import bcrypt from "bcrypt";

const requestPasswordReset = async (email : String) => {

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("User does not exist");
    let token = await TokenModel.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 8);

    await new TokenModel({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `localhost:${process.env.PORT}/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email, link);
    return link;
};