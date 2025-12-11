import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        }
        ,
        mensaje: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        leido: {
            type: Boolean,
            default: false,
        },
        expiraEn: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Notificacion", notificacionSchema);