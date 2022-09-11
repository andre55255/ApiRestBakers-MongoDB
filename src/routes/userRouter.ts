import { Router } from "express";
import { userController } from "../controllers/userController";
import { validationRequest } from "../middlewares/validation";
import { validationCreateUser } from "../validationsEndpoints/user/createUserValidation";

const router: Router = Router();

router.post("/user", validationCreateUser, validationRequest, userController.create); 

router.get("/user", userController.getAll);

export default router;