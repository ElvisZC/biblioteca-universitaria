import { Request, Response } from "express";

import {
  obtenerLibrosService,
  crearLibroService
} from "../services/libro.service";

export const obtenerLibros = async (
  req: Request,
  res: Response
) => {

  try {

    const libros = await obtenerLibrosService();

    return res.json(libros);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error obteniendo libros"
    });

  }

};

export const crearLibro = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      titulo,
      autor,
      isbn,
      stock
    } = req.body;

    const response = await crearLibroService(
      titulo,
      autor,
      isbn,
      Number(stock)
    );

    return res.json(response);

  } catch (error: any) {

    console.log(error);

    return res.status(400).json({
      ok: false,
      message: "Error creando libro"
    });

  }

};