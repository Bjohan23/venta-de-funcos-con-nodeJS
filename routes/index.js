import { Router } from "express";
const router = Router();
router.get("/", (req, res) => res.render("index", { title: "Inicio" })); // renderizamos la plantilla
// rutas : marvel , starwars , dc , disney , nosotros
router.get("/marvel", (req, res) => res.render("marvel", { title: "marvel" }));
router.get("/starwars", (req, res) => res.render("starwars", { title: "starwars" }));
router.get("/dc", (req, res) => res.render("dc", { title: "dc" }));
router.get("/disney", (req, res) => res.render("disney", { title: "disney" }));
router.get("/nosotros", (req, res) => res.render("nosotros", { title: "nosotros" }));

export default router;
