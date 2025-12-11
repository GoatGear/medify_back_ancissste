import { Router } from 'express'

import eventController from '../../controllers/v1/event.controller.js';

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

router.get('/admin', eventController.adminEvents);
router.post('/create', authMiddleware, requireRole("admin"), eventController.createEvent);
router.get('/get/:id', authMiddleware, eventController.getEventById);
router.get('/all', authMiddleware, requireRole("admin"), eventController.getAllEvents);

export default router;  