import { Router } from 'express';
import reservasController from '../controllers/reservas.controller.js';

const router = Router();

router.get('/', reservasController.getReservas);
router.post('/', reservasController.createReserva);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);

// Nueva ruta para reservas de actividades
router.post('/reservas-actividades', reservasController.createReservaActividad);

export default router;