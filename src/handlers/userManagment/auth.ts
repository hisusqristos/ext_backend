import { NextFunction, Request, Response } from "express";
import { validate } from "../../helpers/token";
import jwt, { JwtPayload } from "jsonwebtoken";

export const SECRET_KEY = process.env.JWT_SECRET as string;

export interface IUser {
  userID: string | JwtPayload;
}

export type AuthRequest = Request<{}, {}, { user: IUser }>;

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = validate(token);
    if (!decoded) {
      return res.status(401).json({ message: "no user data found" });
    }

    req.body.user.userID = decoded;

    next(req);
  } catch (err) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

export { auth };
