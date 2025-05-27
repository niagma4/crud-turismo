import express from 'express';
import {
  getAllActividades,
  createActividad,
  updateActividad,
  deleteActividad
} from '../controllers/actividadesController.js';

const router = express.Router();

router.get('/', getAllActividades);
router.post('/', createActividad);
router.put('/:id', updateActividad);
router.delete('/:id', deleteActividad);

export default router;