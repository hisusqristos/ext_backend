import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { AuthRequest } from "./userManagment/auth";
// dotenv.config();

// create an instance of the express application

// set up a secret for signing and verifying JWT tokens
// Storing the token in LocalStorage is fine. If you need to fetch the user details,
// create an endpoint in your API such as getUser. You can then use
// jwt.decode(accessToken, JWT SECRET HERE) and return the decoded value
// (which will be your user) assuming the accessToken is valid.

// ok, pochti ponimayu??

const getProfile = (req: AuthRequest, res: Response) => {
  console.log(req.body.user.userID);
  res.json({ user: "asd" });
};

export { getProfile };
