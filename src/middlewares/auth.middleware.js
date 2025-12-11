import { jwtUtils } from "../utils/jwt.js";
import User from "../schemas/user.schema.js";
import { ErrorInstance } from "../config/error.config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new ErrorInstance("Token no proporcionado", 401);
    }

    const token = authorization.split(" ")[1];

    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
      throw new ErrorInstance("Token inválido", 401);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ErrorInstance("Usuario no encontrado", 404);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
