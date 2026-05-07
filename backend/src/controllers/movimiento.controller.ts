import { Request, Response } from "express";

import {
  registrarSalidaService,
  registrarEntradaService,
  obtenerMovimientosService
} from "../services/movimiento.service";

export const registrarSalida = async (
  req: Request,
  res: Response
) => {

  try {

    const { libro_id } = req.body;

    const usuario_id = (req as any).user.id;

    const response = await registrarSalidaService(
      libro_id,
      usuario_id
    );

    return res.json(response);

  } catch (error: any) {

    return res.status(400).json({
      ok: false,
      message: error.message
    });

  }

};

export const registrarEntrada = async (
  req: Request,
  res: Response
) => {

  try {

    const { libro_id } = req.body;

    const usuario_id = (req as any).user.id;

    const response = await registrarEntradaService(
      libro_id,
      usuario_id
    );

    return res.json(response);

  } catch (error: any) {

    return res.status(400).json({
      ok: false,
      message: error.message
    });

  }

};

export const obtenerMovimientos = async (
  req: Request,
  res: Response
) => {

  try {

    const movimientos = await obtenerMovimientosService();

    return res.json(movimientos);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error obteniendo movimientos"
    });

  }

};