import express from "express";
import { diraname, join } from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
const app = express();

const __filename = fileURLToPath(import.meta.url); // c:\Users\Asus\OneDrive\Escritorio\venta-de-funcos-con-nodeJS\index.js

app.set("views", join(__dirname, "views"));//establece la ubicación de las plantillas . la 
app.set("view engine", "ejs"); // 