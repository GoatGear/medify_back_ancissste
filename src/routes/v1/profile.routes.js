import { Router } from 'express'

import profileController from '../../controllers/v1/profile.controller.js';

import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/admin', profileController.adminProfile);
router.get('/get/:id', authMiddleware, profileController.getProfileById);

export default router;  