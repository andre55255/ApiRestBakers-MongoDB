import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { UserRepositoryImpl } from "../../repositories/user/userRepositoryImpl";
import { UserRepositoryInterface } from "../../repositories/user/userRepositoryInterface";
import { LoginVO } from "../../viewObjects/account/LoginVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { AccountServiceInterface } from "./accountServiceInterface";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { DecodedVO } from "../../viewObjects/account/DecodedVO";
import { configToken } from "../../helpers/constants";

export class AccountServiceImpl implements AccountServiceInterface {

    private userRepo: UserRepositoryInterface;

    constructor() {
        this.userRepo = new UserRepositoryImpl();
    }

    public async login(loginVO: LoginVO): Promise<ResultVO> {
        try {
            const userSave = await this.userRepo.getByUsername(loginVO.username);
            if (!userSave || userSave.username != loginVO.username) {
                logger.error(`AccountService login - Usuário não encontrado: ${loginVO.username}`);
                return buildResult(false, "Usuário não encontrado");
            }
            const consistPassword = await compare(loginVO.password, String(userSave.password));
            if (!consistPassword) {
                logger.error(`AccountService login - Senha incorreta: ${loginVO.username}`);
                return buildResult(false, "Senha incorreta");
            }
            const payloadToken: DecodedVO = {
                _id: String(userSave._id),
                username: String(userSave.username),
                roles: userSave.roles
            };
            const jwt = sign(payloadToken, process.env.JWT_KEY, {
                expiresIn: configToken.expiresIn,
                audience: configToken.audience,
                issuer: configToken.issuer
            });
            if (!jwt) {
                logger.error(`Falha ao gerar token de acesso: ${userSave.username}`);
                return buildResult(false, "Falha ao gerar token de acesso");
            }
            return buildResult(true, "Login efetuado com sucesso", {
                accessToken: jwt,
                fullname: userSave.firstname + " " + userSave.lastname
            });
        } catch (err: any) {
            logger.error("AccountService login - Falha ao realizar login: " + err);
            return buildResult(false, "Falha inesperada ao realizar login");
        }
    }
}