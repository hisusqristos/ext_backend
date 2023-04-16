import { NextFunction, Request, Response } from "express";
import { validate } from "../../helpers/token"
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string

interface CustomRequest extends Request {
    user: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = validate(token);
        if (!decoded) {
            return res.status(401).json({ "message": "no user data found" });
        }

        (req as CustomRequest).user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ "message": "Please authenticate" });
    }
};
export { auth, CustomRequest };