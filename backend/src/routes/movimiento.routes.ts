import express from "express";

import { verificarToken } from "../middlewares/auth.middleware";

import {
  registrarSalida,
  registrarEntrada,
  obtenerMovimientos
} from "../controllers/movimiento.controller";

const router = express.Router();

router.post(
  "/salida",
  verificarToken,
  registrarSalida
);

router.post(
  "/entrada",
  verificarToken,
  registrarEntrada
);

router.get(
  "/",
  verificarToken,
  obtenerMovimientos
);

export default router;