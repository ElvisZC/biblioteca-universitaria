import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/jwt";
import { loginUsuarioService } from "../services/usuario.service";

import {
  crearUsuarioService,
  obtenerUsuariosService,
  obtenerUsuarioPorIdService,
  actualizarUsuarioService,
  eliminarUsuarioService,
} from "../services/usuario.service";

/**
 * Crear usuario
 */
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    await crearUsuarioService(nombre, email, password, rol);

    return res.json({
      ok: true,
      message: "Usuario creado correctamente"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error creando usuario"
    });
  }
};

/**
 * Obtener todos los usuarios
 */
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const data = await obtenerUsuariosService();
    return res.json(data);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error obteniendo usuarios"
    });
  }
};

/**
 * Obtener usuario por ID
 */
export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const data: any = await obtenerUsuarioPorIdService(id);

    if (data.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado"
      });
    }

    return res.json(data[0]);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error obteniendo usuario"
    });
  }
};

/**
 * Actualizar usuario
 */
export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { nombre, email, rol } = req.body;

    await actualizarUsuarioService(id, nombre, email, rol);

    return res.json({
      ok: true,
      message: "Usuario actualizado correctamente"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error actualizando usuario"
    });
  }
};

/**
 * Eliminar usuario
 */
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await eliminarUsuarioService(id);

    return res.json({
      ok: true,
      message: "Usuario eliminado correctamente"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error eliminando usuario"
    });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {

  try {

    // 1. recibir datos del frontend
    const { email, password } = req.body;

    // 2. buscar usuario en la BD
    const user = await loginUsuarioService(email);

    // 3. si no existe usuario
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado"
      });
    }

    // 4. comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    // 5. si contraseña incorrecta
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        message: "Contraseña incorrecta"
      });
    }

    // 6. generar token JWT
    const token = generarToken(user.id, user.rol);

    // 7. responder al frontend
    return res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error en login"
    });

  }

};