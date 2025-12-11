function getHtmlBodyRegistro(message) {
    const profesion = message.profesion === "Estudiante" ? "" : message.profesion || "";
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reservación exitosa</title>

        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f5f6fa;
                font-family: Arial, Helvetica, sans-serif;
            }

            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            }

            .header {
                background: #0073e6;
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 22px;
                font-weight: bold;
            }

            .content {
                padding: 25px;
                text-align: center;
                color: #333333;
            }

            .content h1 {
                font-size: 24px;
                margin-bottom: 10px;
                color: #222222;
            }

            .content p {
                font-size: 16px;
                margin-bottom: 20px;
                line-height: 1.5;
            }

            .footer {
                padding: 15px;
                text-align: center;
                font-size: 13px;
                color: #777777;
                border-top: 1px solid #e6e6e6;
                background: #fafafa;
            }
        </style>
    </head>

    <body>
        <div class="container">
            
            <div class="header">
                Reservación exitosa
            </div>

            <div class="content">
                <h1>¡Bienvenido ${message.profesion} ${message.nombre} ${message.apellido}!</h1>

                <p>
                    Tu reservación a <strong>${message.evento}</strong> ha sido confirmada exitosamente. Te esperamos en la recepción el día del evento.
                </p>
                <p style="font-size: 26px; font-weight: 700">
                    ¡Hasta entonces!
                </p>
                <img src=${message.img} alt="Evento" style="max-width: 100%; height: auto; margin-top: 20px;" />
            </div>

            <div class="footer">
                © ${new Date().getFullYear()} ANCISSSTE — Todos los derechos reservados.
            </div>

        </div>
    </body>
    </html>
    `;

}

export default getHtmlBodyRegistro;