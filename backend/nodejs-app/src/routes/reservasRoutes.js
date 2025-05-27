import express from 'express';
import { 
  getAllReservas, 
  createReserva, 
  updateReserva, 
  deleteReserva 
} from '../controllers/reservasController.js';

const router = express.Router();

// Obtener todas las reservas
router.get('/', getAllReservas);

// Crear una nueva reserva
router.post('/', createReserva);

// Actualizar una reserva por su ID
router.put('/:id', updateReserva);

// Eliminar una reserva por su ID
router.delete('/:id', deleteReserva);

export default router;