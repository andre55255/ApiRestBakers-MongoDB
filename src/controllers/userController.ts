import { UserServiceImpl } from "./../services/user/userServiceImpl";
import { Request, Response } from "express";
import { buildApiResponse, buildResult } from "../helpers/staticMethods";
import logger from "../middlewares/logger";
import { UserServiceInterface } from "../services/user/userServiceInterface";
import { SaveUserVO } from "../viewObjects/user/SaveUserVO";

class UserController {
    public async create(req: Request, res: Response) {
        try {
            const userService: UserServiceInterface = new UserServiceImpl();

            logger.info("Acessado enpoint: POST /user");
            const userVO = req.body as SaveUserVO;
            if (!userVO) {
                logger.error(
                    "UserController create - Falha ao realizar conversão de dados da requisição: " +
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

            const result = await userService.create(userVO);

            if (!result.success) {
                return res
                    .status(400)
                    .json(buildApiResponse(false, 400, result.message));
            }

            logger.info(
                `Usuário criado com sucesso, username: ${userVO.username}`
            );
            return res
                .status(201)
                .json(
                    buildApiResponse(
                        true,
                        201,
                        "Usuário criado com sucesso",
                        result.object
                    )
                );
        } catch (err: any) {
            logger.error(
                "UserController create - Falha inesperada ao criar usuário: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao criar usuário"
                    )
                );
        }
    }
}

export const userController = new UserController();
