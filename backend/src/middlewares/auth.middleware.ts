import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_dev_key";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    // 1. leer token del header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "No hay token"
      });
    }

    // 2. quitar "Bearer "
    const token = authHeader.split(" ")[1];

    // 3. verificar token
    const decoded = jwt.verify(token, SECRET);

    // 4. guardar usuario en request
    (req as any).user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      ok: false,
      message: "Token inválido"
    });

  }

};