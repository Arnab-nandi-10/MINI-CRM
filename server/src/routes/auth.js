import express from 'express';
import { login, register, getMe, updateProfile, changePassword } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

// Get current user info (for sidebar/menu, etc)
router.get('/me', authenticateJWT, getMe);

// Update user profile
router.put('/update-profile', authenticateJWT, updateProfile);

// Change password
router.post('/change-password', authenticateJWT, changePassword);

export default router;
