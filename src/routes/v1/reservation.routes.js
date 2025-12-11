import { Router } from 'express'

import reservationController from '../../controllers/v1/reservation.controller.js';

import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/admin', reservationController.adminReservations);
router.post('/new', authMiddleware, reservationController.createReservation);
router.post('/user', authMiddleware, reservationController.userReservation);

export default router;  