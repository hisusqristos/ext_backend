import { Schema, model, Types, Model } from "mongoose"

interface Token {
    userId: Types.ObjectId;
    token: string;
    createdAt: Date;
};

const tokenSchema = new Schema<Token, Model<Token>>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const TokenModel = model('Token', tokenSchema);
export { TokenModel }