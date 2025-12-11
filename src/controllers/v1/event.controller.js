import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import eventModel from '../../models/v1/event.model.js'

const adminEvents = (req, res) => {
    res.json({ message: 'AdminEvent route' })
}

const getEventById = asyncMiddleware(async (req, res) => {
    res.json(await eventModel.getEventById(req.params.id));
});

const getAllEvents = asyncMiddleware(async (req, res) => {
    res.json(await eventModel.getAllEvents(req.body));
}
);

const createEvent = asyncMiddleware(async (req, res) => {
    res.json(await eventModel.createEvent(req.body));
});

const eventController = {
    adminEvents,
    createEvent,
    getEventById,
    getAllEvents
};

export default eventController;