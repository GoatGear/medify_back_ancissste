function getHtmlBody(message) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple HTML</title>
        </head>
        <body>
            <h1>Hello, World! ${message} iiii!!</h1>
            <p>This is a simple HTML document returned from a JavaScript function.</p>
        </body>
        </html>
    `;
}

export default getHtmlBody;