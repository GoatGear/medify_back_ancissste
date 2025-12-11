import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        descripcion: {
            type: String,
            required: true,
            trim: true,
        },
        slogan: {
            type: String,
            trim: true,
        },
        fechas:
            {
                fecha_inicio: {
                    type: Date,
                    required: true,
                },
                fecha_fin: {
                    type: Date,
                    required: true,
                },
            },
        ubicacion: {
            type: String,
            required: true,
            trim: true,
        },
        organizador: {
            type: String,
            required: true,
            trim: true,
        },
        patrocinadores:
            [
                {
                    type: String,
                    trim: true,
                },
            ],
        imagenes:
            [
                {
                    type: String,
                    trim: true,
                },
            ],
        precios:
            [
                {
                    tipo: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    monto: {
                        type: Number,
                        required: true,
                        min: 0,
                    },
                },
            ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Event", eventSchema);