import { ErrorInstance } from '../../config/error.config.js'
import Event from '../../schemas/event.schema.js'
import Reservation from '../../schemas/reservations.schema.js'
import User from '../../schemas/user.schema.js'

const getUserDto = async (userID) => {
    //console.log(userID, 'DTO MODEL');
    try {
        // console.log( 'DTO MODEL TRY');
        // Obtener usuario
        const userFound = await User.findById(userID);
        // Comprobar si no hay reservaciones a su nombre
        const reservationsFound = await Reservation.find({ user: userID }).populate('event');
        // Obtener eventos disponibles
        const eventsFound = await Event.find({});

        const eventsWithUserReservation = eventsFound.map(event => {
            const isReserved = reservationsFound.some(reservation => reservation.event._id.toString() === event._id.toString());
            return {
                ...event.toObject(),
                isReserved
            };
        });

        // Armar respuesta para el frontend Inicio
        return {
            userFound,
            reservationsFound,
            eventsWithUserReservation
        };
    }
    catch (error) {
        throw new ErrorInstance("Error obtener información del usuario", 500, error.message);
    }
}


const dtoModel = {
    getUserDto
}

export default dtoModel