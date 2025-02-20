import nodemailer from 'nodemailer';

// Crear un transporte con la configuración de Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ashcroft0898@gmail.com',  // Tu correo de Gmail
        pass: 'xpvh grye kddu xnxk' // Tu contraseña de la cuenta o una "App Password" de Gmail
    }
});

// Función para enviar un correo
export const sendEmail = async (email, subject, message) => {
    try {
        const mailOptions = {
            from: 'ashcroft0898@gmail.com',  // Tu correo de Gmail
            to: email,                   // El correo de destino
            subject: subject,            // Asunto del correo
            html: message,               // Cuerpo del mensaje en formato HTML
        };

        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo');
    }
};
