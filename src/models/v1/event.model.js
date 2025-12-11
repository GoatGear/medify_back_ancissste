import { ErrorInstance } from '../../config/error.config.js'
import Event from '../../schemas/event.schema.js'

const getEventById = async (id) => {
    try {
        return await Event.findById(id);    
    }
    catch (error) {
        throw new ErrorInstance("Error obtener evento", 500, error.message);
    }
}

const createEvent = async (data) => {
    try {
        const newEvent = new Event(data);
        return await newEvent.save();
    }
    catch (error) {
        throw new ErrorInstance("Error al hacer crear evento", 500, error.message);
    }
}   

const getAllEvents = async (data) => {
    try {
        return await Event.find({});
    }
    catch (error) {
        throw new ErrorInstance("Error al obtener todos los eventos", 500, error.message);
    }
} 

const eventModel = {
    getEventById,
    createEvent,
    getAllEvents
    
}

export default eventModel