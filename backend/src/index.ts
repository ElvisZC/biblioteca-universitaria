import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes";

const app = express();

// 🔥 CORS DEBE IR PRIMERO
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.listen(4000, () => {
  console.log("Backend corriendo en http://localhost:4000");
});
