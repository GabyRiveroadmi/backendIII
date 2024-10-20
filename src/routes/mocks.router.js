import { Router} from 'express';
import generarUsuarios from "../utils/util.js";


const router = Router();

router.get("/mockingusers", (req, res) => {
    const usuarios = generarUsuarios(50);  // Genera 50 usuarios
    res.json(usuarios);
});

// Aquí deberías agregar el endpoint para /mockingpets si tienes el código
router.get("/mockingpets", (req, res) => {
    // Código para mockingpets
    res.json({ message: "Mocking pets endpoint" });
});



export default router;