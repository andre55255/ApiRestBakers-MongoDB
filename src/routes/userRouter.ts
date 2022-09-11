import { Router } from "express";
import { userController } from "../controllers/userController";

const router: Router = Router();

router.post("/user", userController.create);

router.get("/user", userController.getAll);

export default router;