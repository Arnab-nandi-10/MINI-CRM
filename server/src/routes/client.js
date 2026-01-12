import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

router.get('/', authenticateJWT, clientController.getClients);
router.post('/', authenticateJWT, authorizeRoles('Admin', 'Sales Executive'), clientController.createClient);
router.get('/:id', authenticateJWT, clientController.getClientById);
router.put('/:id', authenticateJWT, authorizeRoles('Admin', 'Sales Executive'), clientController.updateClient);
router.delete('/:id', authenticateJWT, authorizeRoles('Admin'), clientController.deleteClient);

export default router;
