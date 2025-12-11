/**
 * @description  v1 routes
 */

import { Router } from 'express';

// Load all v1 routes
import defaultRoutes from './default.js';
import authRoutes from './auth.routes.js';
import reservationRoutes from './reservation.routes.js';
import profileRoutes from './profile.routes.js';
import eventRoutes from './event.routes.js';
import dtoRoutes from './dto.routes.js';
import cuponRoutes from './cupon.routes.js';
import testRoutes from './test.routes.js';
import notificacionRoutes from './notifications.routes.js';

const router = Router();

router.use('/', defaultRoutes);
router.use('/auth', authRoutes);
router.use('/reservation', reservationRoutes);
router.use('/profile', profileRoutes);
router.use('/events', eventRoutes);
router.use('/dto', dtoRoutes);
router.use('/cupons', cuponRoutes); 
router.use('/test', testRoutes);
router.use('/notification', notificacionRoutes);

export default router;