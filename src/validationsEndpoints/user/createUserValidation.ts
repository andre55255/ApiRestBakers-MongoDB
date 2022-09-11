import { check } from "express-validator";

export const validationCreateUser = [
    check("id").notEmpty().isString().withMessage("Id não informado"),
    check("firstname")
        .notEmpty()
        .isString()
        .withMessage("Primeiro nome não informado")
        .isLength({ min: 3, max: 50 })
        .withMessage("Primeiro nome deve ter entre 3 e 50 caracteres"),
    check("lastname")
        .optional({ nullable: true })
        .isLength({ min: 3, max: 50 })
        .withMessage("Sobrenome deve ter entre 3 e 50 caracteres"),
    check("username")
        .notEmpty()
        .isString()
        .withMessage("Nome de usuário não informado")
        .isLength({ min: 3, max: 45 })
        .withMessage("Nome de usuário deve ter entre 3 E 45 caracteres"),
    check("password")
        .notEmpty()
        .withMessage("Senha não informada")
        .isString()
        .isLength({ min: 6, max: 20 })
        .withMessage("A senha deve ter entrei 6 e 20 caracteres"),
    check("roles").notEmpty().isArray().withMessage("Perfis não informados"),
];
