import { ErrorInstance } from '../../config/error.config.js';
import { sendEmail } from '../../services/sendEmail.js';
import getHtmlBodyReservacion from '../../services/html/reservacion.html.js';
import Reservation from '../../schemas/reservations.schema.js';
import Event from '../../schemas/event.schema.js';
import User from '../../schemas/user.schema.js';
import Cupon from '../../schemas/cupon.schema.js';
import crypto from "crypto";

const createReservation = async (data) => {
    try {
        const { user, event, tipo_pago, cuponId } = data;

        // ------------------------------------------
        // 1. Validar usuario
        // ------------------------------------------
        const userFound = await User.findById(user);
        if (!userFound) throw new ErrorInstance(404, "Usuario no encontrado");

        // ------------------------------------------
        // 2. Validar evento
        // ------------------------------------------
        const eventFound = await Event.findById(event);
        if (!eventFound) throw new ErrorInstance(404, "Evento no encontrado");

        // ------------------------------------------
        // 3. Validar que el usuario no tenga reserva previa
        // ------------------------------------------
        const previous = await Reservation.findOne({ user, event });
        if (previous) throw new ErrorInstance(400, "Ya tienes una reservación para este evento");

        // ------------------------------------------
        // 4. Preparar datos iniciales de la reservación
        // ------------------------------------------

        const codigo_checkin = crypto.randomBytes(6).toString("hex");

        // Normalizar método de pago según el schema ENUM
        let metodo = tipo_pago;

        if (tipo_pago === "codigo") {
            metodo = "cupon";  // ✔ ENUM válido
        }

        const reservationData = {
            user,
            event,
            codigo_checkin,
            pago: {
                metodo_pago: metodo,
                pago_realizado: false,
            }
        };


        // ------------------------------------------
        // 5. Si aplica cupón
        // ------------------------------------------
        if (tipo_pago === "codigo" && cuponId) {
            const cuponFound = await Cupon.findById(cuponId);
            if (!cuponFound) throw new ErrorInstance(404, "Cupón no encontrado al crear reservación");

            // marcar cupón utilizado
            reservationData.pago.cupon_utilizado = cuponId;
            reservationData.pago.monto_pagado = 0;
            reservationData.status = "confirmado";  // acceso inmediato

            // aumentar uso del cupón
            cuponFound.usos_actuales += 1;
            await cuponFound.save();
        }

        // ------------------------------------------
        // 6. Si es pago en sitio
        // ------------------------------------------
        if (tipo_pago === "sitio") {
            reservationData.status = "pendiente_pago";
            reservationData.pago.monto_pagado = 0;
        }

        // ------------------------------------------
        // 7. Si es Stripe
        // ------------------------------------------
        if (tipo_pago === "stripe") {
            reservationData.status = "pagado";
            reservationData.pago.pago_realizado = true;
            reservationData.pago.fecha_pago = new Date();
            reservationData.pago.monto_pagado = eventFound.precios?.[0]?.monto || 0;
        }

        // ------------------------------------------
        // 8. Crear reservación
        // ------------------------------------------
        let newReservation = await Reservation.create(reservationData);
        newReservation = await newReservation.populate(['user', 'event']);


        // ------------------------------------------
        const message = {
            nombre: newReservation.user.nombre,
            apellido: newReservation.user.apellido,
            profesion: newReservation.user.profesion,
            especialidad: newReservation.user.especialidad,
            correo: newReservation.user.correo,
            evento: newReservation.event.nombre,
            img: 'https://res.cloudinary.com/dcznrjqcn/image/upload/v1764824733/Evento_umc79t.png'
        }

        const html = getHtmlBodyReservacion(message);

        await sendEmail({
            to: newReservation.user.correo,
            subject: "ANCISSSTE - Confirmación de reservación",
            html: html
        });

        return {
            message: "Reservación creada con éxito",
            reservation: newReservation
        };
    }
    catch (error) {
        console.error("❌ Error en createReservation:", error);
        throw error;
    }
};

const userReservation = async (data) => {
    const { id } = data;

    const reservations = await Reservation.find({ user: id })
        .populate('event')
        .populate('user');

    return reservations;
}

const reservationModel = {
    createReservation,
    userReservation
};

export default reservationModel;