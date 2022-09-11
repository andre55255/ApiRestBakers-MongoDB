import { UserRepositoryImpl } from './../../repositories/user/UserRepositoryImpl';
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { SaveUserVO } from "../../viewObjects/user/SaveUserVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { UserServiceInterface } from "./userServiceInterface";
import { UserRepositoryInterface } from '../../repositories/user/userRepositoryInterface';
import { IUserModel } from '../../database/models/user/IUserModel';
import { hash } from "bcrypt";

export class UserServiceImpl implements UserServiceInterface {

    private userRepo: UserRepositoryInterface;

    constructor() {
        this.userRepo = new UserRepositoryImpl();
    }

    public async create(userVO: SaveUserVO): Promise<ResultVO> {
        try {
            const userSave = await this.userRepo.getByUsername(userVO.username);
            if (userSave) {
                return buildResult(false, "Usuário já existe na base de dados");
            }
            const userEntity: IUserModel = userVO as IUserModel;
            const hashPassword = await hash(userVO.password, 10);
            if (!hashPassword) {
                logger.error("UserService create - Falha ao encriptar senha para inserir");
                return buildResult(false, "Falha ao tratar senha de usuário");
            }
            userEntity.password = hashPassword;
            const resultCreate = await this.userRepo.create(userEntity);
            return resultCreate;
        } catch (err: any) {
            logger.error("UserService create - Falha ao criar usuário: " + err);
            return buildResult(false, "Falha inesperada ao criar usuário");
        }
    }
}