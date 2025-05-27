import { Router } from 'express';
import actividadesController from '../controllers/actividades.controller.js';

const router = Router();

router.get('/', actividadesController.getActividades);
router.post('/', actividadesController.createActividad);
router.put('/:id', actividadesController.updateActividad);
router.delete('/:id', actividadesController.deleteActividad);

export default router;