import { Response } from "express";
import { User, UserModel } from "../models/user";
import { AuthRequest } from "./userManagment/auth";

const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.body.user.userID
    const user = await UserModel.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server error" });
  }
};

export { getProfile };
