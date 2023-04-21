import { Request, Response } from "express"
import { UserModel } from "../models/user"
import { validateUser } from "../helpers/userValidator";

const updateProfile = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {

        const authorized: Boolean = req.body.user.id == userId
        if (!authorized) {
            return res.status(403).json({ "message": "not authorized" });
        }

        const valid = validateUser(updatedUserData)
        if (!valid) {
            return res.status(422).json({ "message": "invalid data was provided" });
        }
        await UserModel.findByIdAndUpdate(userId, updatedUserData);

        return res.status(200).send('profile updated successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error updating profile');
    }
}

export { updateProfile }