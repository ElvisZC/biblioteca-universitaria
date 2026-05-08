import { Request, Response, NextFunction } from "express";

export const validarRol = (rolesPermitidos: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {

    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "No autenticado"
      });
    }

    if (!user.rol) {
      return res.status(403).json({
        ok: false,
        message: "Rol no definido"
      });
    }

    if (!rolesPermitidos.includes(user.rol)) {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para esta acción"
      });
    }

    next();

  };

};