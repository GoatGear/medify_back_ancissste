import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        asistencias: [
            {
                nombre: String,
                codigo: String,
                asistio: { type: Boolean, default: false },
                timestamp: { type: Date, default: null },
            }
        ],
        constancia: {
            constancia_habilitada: { type: Boolean, default: false },
            constancia_enviada: { type: Boolean, default: false }
        },
        pago: {
            pago_realizado: { type: Boolean, default: false },
            metodo_pago: { type: String, enum: ["stripe", "cupon", "promocion", "transferencia", "efectivo", "sitio"], default: null },
            cupon_utilizado: { type: mongoose.Schema.Types.ObjectId, ref: "Cupon", default: null },
            fecha_pago: { type: Date, default: null },
            monto_pagado: { type: Number, default: 0 },
            moneda: { type: String, default: "MXN" },
            referencia_pago: { type: String },
        },
        status: {
            type: String,
            enum: [
                "pendiente_pago",
                "pagado",
                "confirmado",
                "checkin_realizado",
                "cancelado",
                "finalizado",
            ],
            default: "pendiente_pago"
        },
        codigo_checkin: {
            type: String,
            unique: true,
            index: true
        }
    },
    {
        timestamps: true,
    }
);

reservationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model("Reservation", reservationSchema);