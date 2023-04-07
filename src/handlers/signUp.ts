import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import { validateUser } from "../helpers/userValidator"
import bcrypt from "bcrypt";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, role, password } = req.body;
    // Validating input
    const isValid = validateUser({
        username: username,
        email: email,
        role: role,
        password: password
    });

    if (!isValid) {
        return res.status(422).json({ "message": "invalid data was provided" })
    }

    const foundUser = await UserModel.findOne({ $or: [{ username }, { email }] })
    if (foundUser) {
        return res.status(409).json({ "message": "user already exists" })
    };

    const hashedPasswd = bcrypt.hashSync(password, 10);

    const newUser = new UserModel({
        username: username,
        email: email,
        role: role,
        password: hashedPasswd
    });

    try {
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        next()
    }
};

export { signUp }