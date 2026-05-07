import { Router } from "express";
import { loginUsuario } from "../controllers/usuario.controller";
import { verificarToken } from "../middlewares/auth.middleware";
import { validarRol } from "../middlewares/role.middleware";

import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuario.controller";

const router = Router();

router.post("/", crearUsuario);
router.get(
  "/",
  verificarToken,
  validarRol(["ADMIN"]),
  obtenerUsuarios
);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);
router.post("/login", loginUsuario);

export default router;