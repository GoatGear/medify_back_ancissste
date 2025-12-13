import User from '../../schemas/user.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { sendEmail } from '../../services/sendEmail.js';
import getHtmlBodyRegistro from '../../services/html/registro.html.js';
import getHtmlBodyOperador from '../../services/html/operador.html.js';
import { hashUtils } from '../../utils/hash.js'
import { jwtUtils } from '../../utils/jwt.js';
import crypto from 'crypto';

const createUser = async (data) => {
    try {
        const { nombre, apellido, correo, password } = data;
        const userFound = await User.findOne({ correo });

        if (!nombre || !apellido || !correo || !password) {
            throw new ErrorInstance("Todos los campos son obligatorios", 404);
        }

        if (userFound) {
            throw new ErrorInstance("El correo esta en uso", 404);
        }

        const passwordHash = await hashUtils.hash(password);

        const newUser = new User({
            ...data,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        const token = jwtUtils.generateToken({
            id: userSaved._id,
            role: userSaved.role,
            correo: userSaved.correo
        });

        if (userSaved.role === 'user') {
            // Email usuarios normales
            const message = {
                nombre: userSaved.nombre,
                apellido: userSaved.apellido,
                profesion: userSaved.profesion,
                especialidad: userSaved.especialidad,
                correo: userSaved.correo,
                img: 'https://res.cloudinary.com/dcznrjqcn/image/upload/v1764824733/Evento_umc79t.png'
            }

            const html = getHtmlBodyRegistro(message);

            const response = await sendEmail({
                to: userSaved.correo,
                subject: "Verificación de correo",
                html
            });

            return {
                id: userSaved._id,
                nombre: userSaved.nombre,
                apellido: userSaved.apellido,
                correo: userSaved.correo,
                role: userSaved.role,
                access_token: token,
                correo_enviado: response.data
            };
        } else {
            // Email operadores
            const message = {
                nombre: userSaved.nombre,
                correo: userSaved.correo,
                password: password,
            }
            const html = getHtmlBodyOperador(message);
            const response = await sendEmail({
                to: userSaved.correo,
                subject: "Registro como operador exitoso",
                html
            });
            return {
                id: userSaved._id,
                nombre: userSaved.nombre,
                apellido: userSaved.apellido,
                correo: userSaved.correo,
                role: userSaved.role,
                access_token: token,
                correo_enviado: response.data
            };
        }

    } catch (error) {
        throw error;
    }
}

const login = async (data) => {
    try {
        const { correo, password } = data;

        const userFound = await User.findOne({ correo }).select("+password");
        if (!userFound) throw new ErrorInstance("Usuario no encontrado", 404);
        const isMatch = await hashUtils.compare(password, userFound.password);
        if (!isMatch) throw new ErrorInstance("Contraseña incorrecta", 404)

        const token = jwtUtils.generateToken({
            id: userFound._id,
            role: userFound.role,
            correo: userFound.correo
        });

        return {
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            correo: userFound.correo,
            role: userFound.role,
            access_token: token,
        }

    } catch (error) {
        throw new ErrorInstance("Error al hacer login", 500, error.message);
    }
}

const forgotPassword = async (data) => {
    try {
        const { correo } = data;
        const userFound = await User.findOne({ correo });

        if (!userFound) {
            throw new ErrorInstance("Usuario no encontrado", 404);
        }

        // 1️⃣ Crear token seguro
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // 2️⃣ Guardar token y expiración (10 min)
        userFound.passwordResetToken = hashedToken;
        userFound.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        const result = await userFound.save();
        // 3️⃣ Crear URL de recuperación
        const resetURL = `https://app.ancissste.com/reset-password/${resetToken}`;

        // 4️⃣ Enviar correo real
        await sendEmail({
            to: correo,
            subject: "Recuperación de contraseña",
            html: `
              <p>Haga clic en el siguiente enlace para restablecer su contraseña:</p>
              <a href="${resetURL}">${resetURL}</a>
            `
        });

        return {
            success: true,
            message: `Se envió un enlace de recuperación a ${correo}`
        };

    } catch (error) {
        throw new ErrorInstance("Error al obtener nueva contraseña", 500, error.message);
    }
};

const resetPassword = async ({ token, password }) => {
    try {
        // Hashear token para buscarlo
        const hashedToken =
            crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new ErrorInstance("Token inválido o expirado", 400);
        }

        user.password = await hashUtils.hash(password);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        return { success: true, message: "Contraseña restablecida correctamente" };

    } catch (error) {
        throw new ErrorInstance("Error al restablecer contraseña", 500, error.message);
    }
};




const getAll = async () => {
    try {
        let users;
        users = await User.find({});
        return users;
    } catch (error) {
        throw new ErrorInstance("Error al obtener los usuarios", 500, error.message);
    }
}

const putUser = async (data) => {
    try {
        const existingUser = await User.findById(data.id);

        if (!existingUser) {
            throw new ErrorInstance("Usuario no encontrado", 404);
        }
        const updatedData = {
            nombre: data.nombre || existingUser.nombre,
            apellido: data.apellido || existingUser.apellido,
            correo: data.correo || existingUser.correo,
            telefono: data.telefono || existingUser.telefono,
            password: data.password || existingUser.password,
            role: data.role || existingUser.role
        };

        const updatedUser = await User.findByIdAndUpdate(
            data.id,
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        return updatedUser;
    } catch (error) {
        throw new ErrorInstance("Error al actualizar el usuario", 500, error.message);
    }
}

const delUser = async (data) => {
    try {
        const { id } = data;
        const response = await User.findByIdAndDelete(id);
        return (response)
    } catch (error) {
        throw new ErrorInstance("Error al borrar", 500, error.message);
    }
}

const authModel = {
    createUser,
    login,
    forgotPassword,
    resetPassword,
    getAll,
    putUser,
    delUser
}

export default authModel