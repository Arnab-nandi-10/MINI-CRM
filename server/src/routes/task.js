import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/', authenticateJWT, taskController.getTasks);
router.post('/', authenticateJWT, authorizeRoles('Admin', 'Sales Executive', 'Support Staff'), taskController.createTask);
router.get('/:id', authenticateJWT, taskController.getTaskById);
router.put('/:id', authenticateJWT, authorizeRoles('Admin', 'Sales Executive', 'Support Staff'), taskController.updateTask);
router.delete('/:id', authenticateJWT, authorizeRoles('Admin'), taskController.deleteTask);

export default router;
