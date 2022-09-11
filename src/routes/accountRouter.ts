import { Router } from "express";
import { accountController } from "../controllers/accountController";
import { validationRequest } from "../middlewares/validation";
import { validationLogin } from "../validationsEndpoints/account/loginValidation";

const router: Router = Router();

router.post("/account/login", validationLogin, validationRequest, accountController.login);

export default router;