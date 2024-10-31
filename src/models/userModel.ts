import mongoose from "mongoose";

// Interface and model defs for User
export interface IUser {
    _id: string,
    has_labels: boolean,
    activity_ids: string[]
}

export interface UserDoc extends mongoose.Document {
    has_labels: IUser["has_labels"],
    activity_ids: IUser["activity_ids"]
}

export interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}

const userSchema = new mongoose.Schema<UserDoc> (
    {
        _id: {
            type: String,
            required: true
        },
        has_labels: {
            type: Boolean,
            default: false
        },
        activity_ids: [
            {
                type: String
            }
        ]
    },
    {collection: "user"}
)

userSchema.statics.build = (attr: IUser) => {
    return new User(attr);
}

const User = mongoose.model<UserDoc, UserModelInterface>("user", userSchema)

export default User