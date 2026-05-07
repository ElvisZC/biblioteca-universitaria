import express from "express";

import {
  obtenerLibros,
  crearLibro
} from "../controllers/libro.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/",
  verificarToken,
  obtenerLibros
);

router.post(
  "/",
  verificarToken,
  crearLibro
);

export default router;