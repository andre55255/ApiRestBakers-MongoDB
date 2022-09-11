import { UserModel } from "../../database/models/user/UserModel";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { UserRepositoryInterface } from "./userRepositoryInterface";
import dbUser from "../../database/models/user/User";

export class UserRepositoryImpl implements UserRepositoryInterface {
    public async getAll(): Promise<UserModel[]> {
        try {
            const usersSave: UserModel[] = await dbUser.find({ disabledAt: null });
            return usersSave;
        } catch (err: any) {
            logger.error(
                "UserRepository getAll - Exceção: " + err
            );
            return null;
        }
    }

    public async getByUsername(username: string): Promise<UserModel> {
        try {
            const userSave = await dbUser.findOne({ username });

            return userSave;
        } catch (err: any) {
            logger.error(
                "UserRepository getByEmail - Exceção: " + err
            );
            return null;
        }
    }

    public async create(user: UserModel): Promise<ResultVO> {
        try {
            const userCreated = await dbUser.create(user);

            if (userCreated._id) {
                return buildResult(true, "Usuário criado", userCreated);
            }

            return buildResult(
                false,
                "Erro ao inserir usuário na base de dados"
            );
        } catch (err: any) {
            logger.error("UserRepository create - Falha na criação: " + err);
            return buildResult(false, "Falha ao criar usuário");
        }
    }
}
