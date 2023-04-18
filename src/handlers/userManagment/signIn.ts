import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { generateToken } from "../../helpers/token";
import bcrypt from "bcrypt";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "email incorrect" });
  }

  const correctPassword: Boolean = bcrypt.compareSync(password, user.password);
  if (!correctPassword) {
    return res.status(401).send({ message: `password incorrect` });
  }

  const token = await generateToken(user._id, user.email);
  return res.status(200).json({ token });
};

export { signIn }