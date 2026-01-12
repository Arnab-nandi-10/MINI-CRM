import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', authenticateJWT, dashboardController.getDashboardStats);
router.get('/', authenticateJWT, dashboardController.getDashboardStats);

export default router;
