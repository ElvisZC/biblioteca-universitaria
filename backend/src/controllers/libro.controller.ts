import { Request, Response } from "express";

import {
  obtenerLibrosService,
  crearLibroService,
  actualizarLibroService,
  eliminarLibroService
} from "../services/libro.service";

// OBTENER
export const obtenerLibros = async (req: Request, res: Response) => {
  try {
    const libros = await obtenerLibrosService();
    return res.json(libros);
  } catch (error: any) {
    console.log("ERROR REAL:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Error obteniendo libros"
    });
  }
};

// CREAR
export const crearLibro = async (req: Request, res: Response) => {
  try {
    const { titulo, autor, isbn, stock } = req.body;

    const usuario_id =
      (req as any).user?.id ||
      (req as any).user?.userId ||
      (req as any).user?.sub;

    const response = await crearLibroService(
      titulo,
      autor,
      isbn,
      Number(stock),
      usuario_id
    );

    return res.json(response);

  } catch (error: any) {
    console.log("ERROR REAL:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Error creando libro"
    });
  }
};

// ACTUALIZAR
export const actualizarLibro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, autor, isbn, stock } = req.body;

    const usuario_id =
      (req as any).user?.id ||
      (req as any).user?.userId ||
      (req as any).user?.sub;

    const response = await actualizarLibroService(
      Number(id),
      titulo,
      autor,
      isbn,
      Number(stock),
      usuario_id
    );

    return res.json(response);

  } catch (error: any) {
    console.log("ERROR REAL:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Error actualizando libro"
    });
  }
};

// ELIMINAR
export const eliminarLibro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario_id =
      (req as any).user?.id ||
      (req as any).user?.userId ||
      (req as any).user?.sub;

    const response = await eliminarLibroService(
      Number(id),
      usuario_id
    );

    return res.json(response);

  } catch (error: any) {
    console.log("ERROR REAL:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Error eliminando libro"
    });
  }
};