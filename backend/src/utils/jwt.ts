import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_dev_key";

export const generarToken = (id: number, rol: string) => {
  return jwt.sign(
    { id, rol },
    SECRET,
    { expiresIn: "2h" }
  );
};

export const verificarToken = (token: string) => {
  return jwt.verify(token, SECRET);
};