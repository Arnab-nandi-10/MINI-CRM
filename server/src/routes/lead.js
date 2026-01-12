import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import * as leadController from '../controllers/leadController.js';

const router = express.Router();

router.get('/', authenticateJWT, leadController.getLeads);
router.post('/', authenticateJWT, authorizeRoles('Admin', 'Sales Executive'), leadController.createLead);
router.get('/:id', authenticateJWT, leadController.getLeadById);
router.put('/:id', authenticateJWT, authorizeRoles('Admin', 'Sales Executive'), leadController.updateLead);
router.delete('/:id', authenticateJWT, authorizeRoles('Admin'), leadController.deleteLead);

export default router;
