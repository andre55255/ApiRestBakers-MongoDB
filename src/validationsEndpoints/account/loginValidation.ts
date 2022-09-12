import { check } from "express-validator";

export const validationLogin = [
    check("username")
        .notEmpty()
        .withMessage("Nome de usuário não informado")
        .isString()
        .withMessage("Nome de usuário inválido")
        .isLength({ min: 3, max: 50 })
        .withMessage("Primeiro nome deve ter entre 3 e 50 caracteres"),
    check("password")
        .notEmpty()
        .withMessage("Senha não informada")
        .isString()
        .withMessage("Senha inválida")
        .isLength({ min: 6, max: 20 })
        .withMessage("A senha deve ter entrei 6 e 20 caracteres"),
];
