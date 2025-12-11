/**
 * @description Middlewares para el manejo de errores
 */

import { ErrorInstance } from "../config/error.config.js";

// Detectar todos las rutas inexistentes, y enviarla al middleware de error general
export const errorNotFoundMiddleware = (_req, _res, next) => {
  next(new ErrorInstance("El recurso solicitado no existe", 404));
};

export const errorConverterMiddleware = (err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ErrorInstance)) { 
    const internalServerErrorStatusCode = 500;
    error = new ErrorInstance(error.message, internalServerErrorStatusCode, err.stack);
  }
  next(error);
};

export const errorHandlerMiddleware = (err, req, res, _next) => { 

  // Obtener la información desde el error
  const message = err.message;
  const stackTrace = err.stack;
  const statusCode = err.statusCode;
  
  // Payload del error para el cliente
  const response = {
    message,
    code: statusCode,
    url: req.originalUrl,
    stack: stackTrace
  }  

  console.error(response);

  res.status(statusCode).json(response);

}