import { pool } from "../config/db";

export const obtenerLibrosService = async () => {

  const [rows] = await pool.query(
    `
    SELECT * FROM libros
    ORDER BY id DESC
    `
  );

  return rows;
};

export const crearLibroService = async (
  titulo: string,
  autor: string,
  isbn: string,
  stock: number
) => {

  await pool.query(
    `
    INSERT INTO libros
    (titulo, autor, isbn, stock)
    VALUES (?, ?, ?, ?)
    `,
    [titulo, autor, isbn, stock]
  );

  return {
    ok: true,
    message: "Libro creado correctamente"
  };

};