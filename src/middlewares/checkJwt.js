// middlewares/checkJwt.js
import { jwtUtils } from "../utils/jwt.js";
import { ErrorInstance } from "../config/error.config.js";

export const checkJwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const token = bearer || req.headers.token;            // 👈 acepta ambos

  if (!token) {
    return next(new ErrorInstance("Token no encontrado o formato incorrecto", 401));
  }

  try {
    const decoded = jwtUtils.verifyToken(token);        // { id, role, correo, iat, exp }
    req.user = {
      id: decoded.id ?? decoded.sub,
      role: decoded.role,
      correo: decoded.correo,
    };
    return next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return next(new ErrorInstance("Token expirado", 401));
    }
    return next(new ErrorInstance("No fue posible decodificar el token", 401));
  }
};
