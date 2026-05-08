import express from "express";

import {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro
} from "../controllers/libro.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { validarRol } from "../middlewares/role.middleware";

const router = express.Router();

// TODOS pueden ver libros
router.get("/", verificarToken, obtenerLibros);

// SOLO ADMIN puede crear
router.post("/", verificarToken, validarRol(["ADMIN"]), crearLibro);

// SOLO ADMIN puede editar
router.put("/:id", verificarToken, validarRol(["ADMIN"]), actualizarLibro);

// SOLO ADMIN puede eliminar
router.delete("/:id", verificarToken, validarRol(["ADMIN"]), eliminarLibro);

export default router;