import { pool } from "../config/db";

// OBTENER (solo activos)
export const obtenerLibrosService = async () => {

  const [rows] = await pool.query(`
    SELECT * FROM libros
    WHERE estado = 1
    ORDER BY id DESC
  `);

  return rows;
};


// CREAR
export const crearLibroService = async (
  titulo: string,
  autor: string,
  isbn: string,
  stock: number,
  usuario_id: number
) => {

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result]: any = await conn.query(
      `
      INSERT INTO libros (titulo, autor, isbn, stock, estado)
      VALUES (?, ?, ?, ?, 1)
      `,
      [titulo, autor, isbn, stock]
    );

    const libroId = result.insertId;

    await conn.query(
      `
      INSERT INTO movimientos (libro_id, usuario_id, tipo)
      VALUES (?, ?, 'CREACION')
      `,
      [libroId, usuario_id]
    );

    await conn.commit();

    return { ok: true, message: "Libro creado correctamente" };

  } catch (error) {

    console.log("SERVICE ERROR:", error);

    await conn.rollback();
    throw error;

  } finally {
    conn.release();
  }
};


// ACTUALIZAR
export const actualizarLibroService = async (
  id: number,
  titulo: string,
  autor: string,
  isbn: string,
  stock: number,
  usuario_id: number
) => {

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      `
      UPDATE libros
      SET titulo=?, autor=?, isbn=?, stock=?
      WHERE id=? AND estado=1
      `,
      [titulo, autor, isbn, stock, id]
    );

    await conn.query(
      `
      INSERT INTO movimientos (libro_id, usuario_id, tipo)
      VALUES (?, ?, 'EDICION')
      `,
      [id, usuario_id]
    );

    await conn.commit();

    return { ok: true, message: "Libro actualizado correctamente" };

  } catch (error) {

    console.log("SERVICE ERROR:", error);

    await conn.rollback();
    throw error;

  } finally {
    conn.release();
  }
};


// ELIMINAR (SOFT DELETE)
export const eliminarLibroService = async (
  id: number,
  usuario_id: number
) => {

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // ❌ ya NO borramos físicamente
    await conn.query(
      `
      UPDATE libros
      SET estado = 0
      WHERE id = ?
      `,
      [id]
    );

    await conn.query(
      `
      INSERT INTO movimientos (libro_id, usuario_id, tipo)
      VALUES (?, ?, 'ELIMINACION')
      `,
      [id, usuario_id]
    );

    await conn.commit();

    return { ok: true, message: "Libro eliminado correctamente" };

  } catch (error) {

    console.log("SERVICE ERROR:", error);

    await conn.rollback();
    throw error;

  } finally {
    conn.release();
  }
};