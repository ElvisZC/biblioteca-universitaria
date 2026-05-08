import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "Token requerido"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token inválido"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    // IMPORTANTE: aseguramos estructura
    (req as any).user = {
      id: decoded.id,
      nombre: decoded.nombre,
      rol: decoded.rol
    };

    next();

  } catch (error) {

    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado"
    });

  }

};