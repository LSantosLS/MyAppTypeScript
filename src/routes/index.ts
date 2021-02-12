import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

const routes = Router();

interface IUsuario {
  email: string;
  senha: string;
}

const usuarios: IUsuario[] = [];

routes.get("/", (req: Request, res: Response) => {
  return res.json(usuarios);
});

routes.post(
  "/",
  [
    body("email", "teste").isEmail().withMessage("Email inválido"),
    body("senha")
      .isLength({ min: 5 })
      .withMessage("Senha deve possuir 5 caracteres ou mais"),
    body("email").custom(async (value) => {
      const emailExists = await usuarios.filter((u) => u.email == value);
      if (emailExists.length > 0) {
        return Promise.reject("Email já inserido");
      }
      return true;
    }),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;
    const usuario = {
      email,
      senha,
    };
    usuarios.push(usuario);
    return res.json(usuario);
  }
);

export default routes;
