function getHtmlBodyRegistro(message) {
    const profesion = message.profesion === "Estudiante" ? "" : message.profesion || "";
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verificación de correo</title>

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
                Verificación de correo electrónico
            </div>

            <div class="content">
                <h1>¡Bienvenido ${profesion} ${message.nombre} ${message.apellido}!</h1>

                <p>
                    Ahora puedes iniciar sesión en nuestra plataforma utilizando tu correo electrónico: 
                    <strong>${message.correo}</strong>.
                </p>

                <a 
                  href="https://app.ancissste.com/login" 
                  style="
                    display: inline-block;
                    margin-top: 15px;
                    padding: 12px 20px;
                    background: #0073e6;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
                  "
                >
                    Iniciar sesión en la plataforma
                </a>
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
