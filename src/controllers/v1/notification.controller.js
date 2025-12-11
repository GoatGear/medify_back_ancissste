import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import notificationModel from '../../models/v1/notification.model.js';

const adminNotifications = asyncMiddleware(async (req, res) => {
    res.status(200).json({ message: 'Notification Admin Route' });
}
);

const register = asyncMiddleware(async (req, res) => {
    // Enviar correo de prueba
    res.json(await notificationModel.register(req.body));
}
);

export default {
    adminNotifications,
    register
};