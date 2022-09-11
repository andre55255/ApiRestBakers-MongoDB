import { SaveUserVO } from "../../viewObjects/user/SaveUserVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";

export interface UserServiceInterface {
    
    create(userVO: SaveUserVO) : Promise<ResultVO>;
}