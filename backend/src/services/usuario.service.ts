import { pool } from "../config/db";
import bcrypt from "bcrypt";

export const crearUsuarioService = async (
  nombre: string,
  email: string,
  password: string,
  rol: string
) => {

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO usuarios (nombre, email, password, rol)
    VALUES (?, ?, ?, ?)
    `,
    [nombre, email, hash, rol]
  );

  return result;
};

/**
 * Obtener todos los usuarios
 */
export const obtenerUsuariosService = async () => {
  const [rows] = await pool.query(
    `
    SELECT id, nombre, email, rol, created_at
    FROM usuarios
    `
  );

  return rows;
};

/**
 * Obtener usuario por ID
 */
export const obtenerUsuarioPorIdService = async (id: string) => {
  const [rows]: any = await pool.query(
    `
    SELECT id, nombre, email, rol, created_at
    FROM usuarios
    WHERE id = ?
    `,
    [id]
  );

  return rows;
};

/**
 * Actualizar usuario
 */
export const actualizarUsuarioService = async (
  id: string,
  nombre: string,
  email: string,
  rol: string
) => {
  const result = await pool.query(
    `
    UPDATE usuarios
    SET nombre = ?, email = ?, rol = ?
    WHERE id = ?
    `,
    [nombre, email, rol, id]
  );

  return result;
};

/**
 * Eliminar usuario
 */
export const eliminarUsuarioService = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM usuarios
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

export const loginUsuarioService = async (email: string) => {

  const [rows]: any = await pool.query(
    `
    SELECT *
    FROM usuarios
    WHERE email = ?
    `,
    [email]
  );

  return rows[0];
};