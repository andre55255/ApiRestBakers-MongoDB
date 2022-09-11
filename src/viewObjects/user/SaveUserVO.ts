export interface SaveUserVO {
    id: any,
    firstname: string,
    lastname?: string,
    username: string,
    password: string,
    roles: Array<string>,
    createdAt?: Date,
    updatedAt?: Date,
    disabledAt?: Date
}