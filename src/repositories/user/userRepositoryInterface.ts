import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { UserModel } from "../../database/models/user/UserModel";

export interface UserRepositoryInterface {
    create(user: UserModel): Promise<ResultVO>;

    getByUsername(email: string): Promise<UserModel | null>;

    getAll(): Promise<Array<UserModel> | null>;
}