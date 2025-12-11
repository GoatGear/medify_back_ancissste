import mongoose from "mongoose";

const cuponSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      trim: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    usos_maximos: {
      type: Number,
      required: true,
      default: 1,
    },
    usos_actuales: {
      type: Number,
      required: true,
      default: 0,
    },
    habilitado: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cupon", cuponSchema);