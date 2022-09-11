import { Request, Response } from "express";
import { buildApiResponse, buildResult } from "../helpers/staticMethods";
import logger from "../middlewares/logger";
import { AccountServiceImpl } from "../services/account/accountServiceImpl";
import { AccountServiceInterface } from "../services/account/accountServiceInterface";
import { LoginVO } from "../viewObjects/account/LoginVO";

class AccountController {
    public async login(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: POST /account/login");
            const loginVO = req.body as LoginVO;
            if (!loginVO) {
                logger.error(
                    "AccountController login - Falha ao realizar conversão de dados da requisição: " +
                        req.body
                );
                return res
                    .status(400)
                    .json(
                        buildApiResponse(
                            false,
                            400,
                            "Dados não informados na requisição"
                        )
                    );
            }

            const accService: AccountServiceInterface =
                new AccountServiceImpl();
            const result = await accService.login(loginVO);
            if (!result.success) {
                return res
                    .status(400)
                    .json(buildApiResponse(false, 400, result.message));
            }

            logger.info("AccountController login - Login efeutado com sucesso " + loginVO.username);
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Login efetuado com sucesso",
                        result.object
                    )
                );
        } catch (err: any) {
            logger.error(
                "AccountController login - Falha inesperada ao realizar login: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao realizar login"
                    )
                );
        }
    }
}

export const accountController = new AccountController();