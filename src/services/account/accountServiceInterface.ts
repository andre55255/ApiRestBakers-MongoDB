import { LoginVO } from "../../viewObjects/account/LoginVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";

export interface AccountServiceInterface {
    login(loginVO: LoginVO): Promise<ResultVO>;
}
