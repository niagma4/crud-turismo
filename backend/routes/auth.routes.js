import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

router.get('/prueba', authController.prueba);
router.post('/register', authController.register);
router.post('/login', authController.login);


export default router;