// utils/asistencias.js

import crypto from "crypto";

export const generarAsistenciasPorEvento = (event) => {
    const inicio = new Date(event.fechas.fecha_inicio);
    const fin = new Date(event.fechas.fecha_fin);
  
    // Normalizar a inicio de día
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);
  
    const asistencias = [];
    let current = new Date(inicio);
  
    while (current <= fin) {
      asistencias.push({
        nombre: current.toLocaleDateString("es-MX", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        codigo: crypto.randomBytes(4).toString("hex"),
        asistio: false,
        timestamp: null,
      });
  
      current.setDate(current.getDate() + 1);
    }
  
    return asistencias;
  };
  