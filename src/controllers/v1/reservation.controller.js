import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import reservationModel from '../../models/v1/reservation.model.js'

const adminReservations = (req, res) => {
    res.json({ message: 'AdminReservation route' })
}

const createReservation = asyncMiddleware(async (req, res) => {
    res.json(await reservationModel.createReservation(req.body));
});

const userReservation = asyncMiddleware(async (req, res) => {
    res.json(await reservationModel.userReservation(req.body));
});

const reservationController = {
    adminReservations,
    createReservation,
    userReservation
};

export default reservationController;