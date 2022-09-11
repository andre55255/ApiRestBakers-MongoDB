import { FileVO } from "../utils/FileVO"

export interface GetUserVO {
    _id: any,
    firstname: string,
    lastname?: string,
    username: string,
    password: string,
    roles: Array<string>,
    profileImage?: FileVO,
    createdAt?: Date,
    updatedAt?: Date,
    disabledAt?: Date
}