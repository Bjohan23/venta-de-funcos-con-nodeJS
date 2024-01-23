import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)); // obtiene la ruta absoluta

app.set("views", join(__dirname, "views")); //establece la ubicación de las plantillas . la
app.set("view engine", "ejs"); //

// para la carpeta publica usamos la siguiente linea:
app.use(indexRouter); // usamos el router index
app.use(express.static(join(__dirname, "public"))); // seteamos la carpeta publica :

app.listen(process.env.port || 3000);
console.log("Servidor corriendo en el puerto 3000 : http://localhost:3000");
