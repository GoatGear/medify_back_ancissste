import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
    try {

        const response = await resend.emails.send({
            from: "ANCISSSTE <ancissste@medifyevents.com.mx>",
            to,
            subject,
            html  
        });

        return { message: "Email sent successfully", response };

    } catch (error) {
        console.error("Resend ERROR:", error);
        throw new Error(`Error al enviar correo: ${error.message}`);
    }
};
