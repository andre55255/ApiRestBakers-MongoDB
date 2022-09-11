import { IUserModel } from "../../database/models/user/IUserModel";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { UserRepositoryInterface } from "./userRepositoryInterface";
import dbUser from "../../database/models/user/User";

export class UserRepositoryImpl implements UserRepositoryInterface {

    public async getByUsername(email: string): Promise<IUserModel> {
        try {
            const userSave = await dbUser.findOne({ email });

            return userSave;
        } catch (err: any) {
            logger.error("UserRepository getByEmail - Falha na criação: " + err);
            return null;
        }
    }

    public async create(user: IUserModel): Promise<ResultVO> {
        try {
            const userCreated = await dbUser.create(user);
            
            if (userCreated._id) {
                return buildResult(true, "Usuário criado", userCreated);
            } 

            return buildResult(false, "Erro ao inserir usuário na base de dados");
        } catch (err: any) {
            logger.error("UserRepository create - Falha na criação: " + err);
            return buildResult(false, "Falha ao criar usuário");
        }
    }
}