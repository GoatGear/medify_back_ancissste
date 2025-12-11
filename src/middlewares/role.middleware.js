import { ErrorInstance } from "../config/error.config.js";

export const requireRole = (...roles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole || !roles.includes(userRole)) {
        throw new ErrorInstance("No tienes permisos para realizar esta acción", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
