import { Router } from 'express'

import notificationController from '../../controllers/v1/notification.controller.js';

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

router.get('/admin', notificationController.adminNotifications);

router.post('/register', notificationController.register);

export default router;  