import { pool } from "../config/db";

export const registrarSalidaService = async (
  libro_id: number,
  usuario_id: number
) => {

  // 1. verificar stock
  const [libros]: any = await pool.query(
    `
    SELECT * FROM libros
    WHERE id = ?
    `,
    [libro_id]
  );

  if (libros.length === 0) {
    throw new Error("Libro no existe");
  }

  const libro = libros[0];

  if (libro.stock <= 0) {
    throw new Error("No hay stock disponible");
  }

  // 2. registrar movimiento
  await pool.query(
    `
    INSERT INTO movimientos
    (libro_id, usuario_id, tipo)
    VALUES (?, ?, 'SALIDA')
    `,
    [libro_id, usuario_id]
  );

  // 3. disminuir stock
  await pool.query(
    `
    UPDATE libros
    SET stock = stock - 1
    WHERE id = ?
    `,
    [libro_id]
  );

  return {
    ok: true,
    message: "Salida registrada correctamente"
  };

};

export const registrarEntradaService = async (
  libro_id: number,
  usuario_id: number
) => {

  // 1. verificar libro
  const [libros]: any = await pool.query(
    `
    SELECT * FROM libros
    WHERE id = ?
    `,
    [libro_id]
  );

  if (libros.length === 0) {
    throw new Error("Libro no existe");
  }

  // 2. registrar movimiento
  await pool.query(
    `
    INSERT INTO movimientos
    (libro_id, usuario_id, tipo)
    VALUES (?, ?, 'ENTRADA')
    `,
    [libro_id, usuario_id]
  );

  // 3. aumentar stock
  await pool.query(
    `
    UPDATE libros
    SET stock = stock + 1
    WHERE id = ?
    `,
    [libro_id]
  );

  return {
    ok: true,
    message: "Entrada registrada correctamente"
  };

};

export const obtenerMovimientosService = async () => {

  const [rows] = await pool.query(
    `
    SELECT

      movimientos.id,
      libros.titulo AS libro,
      usuarios.nombre AS usuario,
      movimientos.tipo,
      movimientos.fecha

    FROM movimientos

    INNER JOIN libros
      ON movimientos.libro_id = libros.id

    INNER JOIN usuarios
      ON movimientos.usuario_id = usuarios.id

    ORDER BY movimientos.fecha DESC
    `
  );

  return rows;

};