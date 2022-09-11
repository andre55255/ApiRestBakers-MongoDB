import { Schema, model } from "mongoose";
import { UserModel } from "./UserModel";

const UserSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: false
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: {
        type: Array<String>,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        require: true,
        default: new Date()
    },
    disabledAt: {
        type: Date,
        require: false
    }
});

const UserModel = model<UserModel>("users", UserSchema);

export default UserModel;