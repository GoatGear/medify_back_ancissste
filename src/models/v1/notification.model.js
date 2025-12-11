import { ErrorInstance } from '../../config/error.config.js'

const register = async (data) => {
    try {
        console.log("Nueva notificacion registrada:", data);

    } catch (error) {
        throw new ErrorInstance("Error al crear notificación", 500, error.message);
    }
};

const notificationModel = { 
    register
 };

export default notificationModel;