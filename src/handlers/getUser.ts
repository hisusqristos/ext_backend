import { Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { User, UserModel } from "../models/user";
import { AuthRequest } from "./userManagment/auth";

const getProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.body.user.userID

  try {
    const user = await UserModel.findById(userId)
    if (!user){
      return res.status(401).json({ "message": "unauthorized" });  
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err)
  }
};

export { getProfile };
