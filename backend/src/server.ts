import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./config/db";

// Importación de rutas
import usuarioRoutes from "./routes/usuario.routes";
import libroRoutes from "./routes/libro.routes";
import movimientoRoutes from "./routes/movimiento.routes";

dotenv.config();

const app = express();

// 1. CONFIGURACIÓN DE CORS (Debe ser lo primero)
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"] // Añadimos esto para asegurar que el Bearer Token pase sin problemas
}));

// 2. MIDDLEWARE PARA JSON
app.use(express.json());

// 3. DEFINICIÓN DE RUTAS
app.use("/usuarios", usuarioRoutes);
app.use("/libros", libroRoutes);
app.use("/movimientos", movimientoRoutes);

// Puerto
const PORT = process.env.PORT || 4000;

// Ruta de prueba de conexión
app.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    res.json({ message: "API y MySQL conectados correctamente" });
    connection.release();
  } catch (error) {
    console.error("Error de DB:", error);
    res.status(500).json({ error: "Error conectando a MySQL" });
  }
});

// Manejo de rutas no encontradas (404)
// Esto evita que el navegador lance error de CORS cuando te equivocas en una URL
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});