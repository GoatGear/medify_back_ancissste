import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      set: v => v.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      set: v => v.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
    },
    profesion: {
      type: String,
      trim: true,
    },
    especialidad: {
      type: String,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "El correo no tiene un formato válido",
      ],
    },
    telefono: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "operador", "supervisor"],
      default: "user",
    },
    foto_perfil: {
      type: String,
      default: null,
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);