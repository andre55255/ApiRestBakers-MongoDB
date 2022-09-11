export interface UserModel {
    _id?: string,
    firstname: string | String,
    lastname?: string | String,
    username: string | String,
    password: string | String,
    roles: Array<string> | Array<String>,
    createdAt?: Date,
    updatedAt?: Date,
    disabledAt?: Date
};