function getHtmlBodyOperador(message) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido Operador</title>
        </head>
        <body>
            <h1>¡Hola ${message.nombre}!</h1>
            <p>Este es tu usuario y contraseña</p>
            <p>Usuario: ${message.correo}</p>
            <p>Contraseña: ${message.password}</p>
        </body>
        </html>
    `;
}

export default getHtmlBodyOperador;