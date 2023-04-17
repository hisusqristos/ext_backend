import { Schema, model, Types, Model } from "mongoose"
import bcrypt from "bcrypt";

interface User {
    username: string;
    email: string;
    role: string;
    password: string;
    created: Date;
};

const userSchema = new Schema<User, Model<User>>({
    username: {
        type: String,
        required: [true, "fullname not provided "],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "Please specify user role"]
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const UserModel = model('User', userSchema);
export { UserModel, User }