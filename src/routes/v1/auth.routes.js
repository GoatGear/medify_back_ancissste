import { Router } from 'express'

import authController from '../../controllers/v1/auth.controller.js';

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

router.get('/admin', authController.adminAuth);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/resetpass', authController.forgotPassword);
router.post('/resetpass/confirm', authController.resetPassword);
router.get('/getall', authMiddleware, requireRole("admin"), authController.getUsers);
router.put('/update', authMiddleware, requireRole("admin"), authController.updateUser);
router.delete('/delete/:id', authMiddleware, requireRole("admin"), authController.deleteUser);

export default router;  