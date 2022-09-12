import { check } from "express-validator";

export const validationCreateUser = [
    check("id").notEmpty().isString().withMessage("Id não informado"),
    check("firstname")
        .notEmpty()
        .withMessage("Primeiro nome não informado")
        .isString()
        .withMessage("Primeiro nome inválido")
        .isLength({ min: 3, max: 50 })
        .withMessage("Primeiro nome deve ter entre 3 e 50 caracteres"),
    check("lastname")
        .optional({ nullable: true })
        .isLength({ min: 3, max: 50 })
        .withMessage("Sobrenome deve ter entre 3 e 50 caracteres"),
    check("username")
        .notEmpty()
        .withMessage("Nome de usuário não informado")
        .isString()
        .withMessage("Nome de usuário inválido")
        .isLength({ min: 3, max: 45 })
        .withMessage("Nome de usuário deve ter entre 3 E 45 caracteres"),
    check("password")
        .notEmpty()
        .withMessage("Senha não informada")
        .isString()
        .withMessage("Senha inválida")
        .isLength({ min: 6, max: 20 })
        .withMessage("A senha deve ter entre 6 e 20 caracteres"),
    check("roles")
        .notEmpty()
        .withMessage("Perfis não informados")
        .isArray()
        .withMessage("Perfis inválidos"),
];
