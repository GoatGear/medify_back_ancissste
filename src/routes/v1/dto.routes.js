import { Router } from 'express'

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import dtoController from '../../controllers/v1/dto.controller.js';

const router = Router();

router.get('/admin', authMiddleware, dtoController.adminDtos);
router.get('/dtouser/:id', authMiddleware, dtoController.userDtos);

export default router;  