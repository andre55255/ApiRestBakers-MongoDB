import { FileServiceImpl } from "./../file/fileServiceImpl";
import { FileServiceInterface } from "./../file/fileServiceInterface";
import { UserRepositoryImpl } from "../../repositories/user/userRepositoryImpl";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { SaveUserVO } from "../../viewObjects/user/SaveUserVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { UserServiceInterface } from "./userServiceInterface";
import { UserRepositoryInterface } from "../../repositories/user/userRepositoryInterface";
import { UserModel } from "../../database/models/user/UserModel";
import { hash } from "bcrypt";
import { configFileUserAtDirectory } from "../../helpers/constants";
import { GetUserVO } from "../../viewObjects/user/GetUserVO";
import { FileVO } from "../../viewObjects/utils/FileVO";

export class UserServiceImpl implements UserServiceInterface {
    private userRepo: UserRepositoryInterface;
    private fileOneService: FileServiceInterface;

    constructor() {
        this.userRepo = new UserRepositoryImpl();
        this.fileOneService = new FileServiceImpl();
    }
    public async getAll(): Promise<GetUserVO[]> {
        try {
            const usersSave: UserModel[] = await this.userRepo.getAll();
            if (!usersSave) {
                return null;
            }
            const usersVO = usersSave as GetUserVO[];
            usersVO.forEach((user: GetUserVO) => {
                let auxFileVO: FileVO;

                auxFileVO = this.fileOneService.getUrlOneFileAtDirectory(
                    configFileUserAtDirectory.entity,
                    String(user._id)
                );
                
                if (!auxFileVO) {
                    auxFileVO = this.fileOneService.getUrlOneFileAtDirectory(
                        configFileUserAtDirectory.entity,
                        String(user._id),
                        true
                    );
                }
                user.profileImage = auxFileVO;
            });

            return usersVO;
        } catch (err: any) {
            logger.error("UserService getAll - Exceção: " + err);
            return null;
        }
    }

    public async create(userVO: SaveUserVO): Promise<ResultVO> {
        try {
            const userSave = await this.userRepo.getByUsername(userVO.username);
            if (userSave) {
                return buildResult(false, "Usuário já existe na base de dados");
            }
            const userEntity: UserModel = userVO as UserModel;
            const hashPassword = await hash(userVO.password, 10);
            if (!hashPassword) {
                logger.error(
                    "UserService create - Falha ao encriptar senha para inserir"
                );
                return buildResult(false, "Falha ao tratar senha de usuário");
            }
            userEntity.password = hashPassword;
            const resultCreate = await this.userRepo.create(userEntity);
            const userSaveParsed: UserModel = resultCreate.object as UserModel;

            if (userSaveParsed && userVO.profileImage) {
                userVO.profileImage.name = configFileUserAtDirectory.name;

                const resultProfileImg =
                    this.fileOneService.saveOneFileBase64AtDirectory(
                        userVO.profileImage,
                        configFileUserAtDirectory.entity,
                        userSaveParsed._id
                    );

                if (!resultProfileImg.success) {
                    logger.error(
                        "UserService create - Falha ao salvar imagem de perfil: " +
                            userSaveParsed.username
                    );
                }
            }

            return resultCreate;
        } catch (err: any) {
            logger.error("UserService create - Falha ao criar usuário: " + err);
            return buildResult(false, "Falha inesperada ao criar usuário");
        }
    }
}
