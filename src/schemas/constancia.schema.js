import mongoose from "mongoose";

const constanciaSchema = new mongoose.Schema(
    {
        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        imgen_constancia: {
            type: String,
            required: true,
        },
        configuracion: {
            posicion_x: { type: Number, default: 0 },
            posicion_y: { type: Number, default: 0 },
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Constancia", constanciaSchema);