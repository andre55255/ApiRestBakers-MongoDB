import { Router } from "express";
import { accountController } from "../controllers/accountController";

const router: Router = Router();

router.post("/account/login", accountController.login);

export default router;