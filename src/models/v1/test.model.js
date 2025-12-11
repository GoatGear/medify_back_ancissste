import { ErrorInstance } from '../../config/error.config.js'
import { sendEmail } from '../../services/sendEmail.js';
import getHtmlBody from '../../services/html/body.html.js';

const testCorreo = async (data) => {
    try {
        const { to, message } = data;

        const html = getHtmlBody(message);

        const response = await sendEmail({
            to,
            subject: "Correo de prueba",
            html
        });

        return { message: "Test de correo exitoso", response };

    } catch (error) {
        throw new ErrorInstance("Error al hacer test de correo", 500, error.message);
    }
};

const testModel = { testCorreo };

export default testModel;