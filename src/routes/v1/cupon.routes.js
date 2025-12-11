import { Router } from 'express'

import cuponController from '../../controllers/v1/cupon.controller.js';

import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/admin', cuponController.adminCupones);
router.get('/get/:id', authMiddleware, cuponController.getCupones);
router.post('/create', authMiddleware, cuponController.createCupon);
router.post('/validate', authMiddleware, cuponController.validateCupon);
router.put('/update', authMiddleware, cuponController.updateCupon);

export default router;  