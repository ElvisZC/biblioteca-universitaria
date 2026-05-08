import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes";
import libroRoutes from "./routes/libro.routes"; // Asegúrate de que este sea el nombre correcto
import movimientoRoutes from "./routes/movimiento.routes"; // Asegúrate de que este sea el nombre correcto

const app = express();

// 1. MIDDLEWARES (Configuración inicial)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 2. RUTAS (Deben ir todas ANTES del app.listen)
app.use("/usuarios", usuarioRoutes);
app.use("/libros", libroRoutes);
app.use("/movimientos", movimientoRoutes);

// 3. INICIO DEL SERVIDOR (Siempre al final)
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📊 Stats disponibles en: http://localhost:${PORT}/stats`);
});