import express from 'express';
import { getAllUsers, deleteUser, changeUserRole } from '../controllers/usuarios.controllers.js';

const router = express.Router();


router.get('/', getAllUsers);


router.delete('/:id', deleteUser);


router.put('/:id/rol', changeUserRole);

export default router;