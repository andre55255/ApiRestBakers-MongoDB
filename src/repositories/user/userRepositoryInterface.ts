import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { IUserModel } from "../../database/models/user/IUserModel";

export interface UserRepositoryInterface {
    create(user: IUserModel): Promise<ResultVO>;

    getByUsername(email: string): Promise<IUserModel | null>
}