require('dotenv').config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

const enviarCorreoCompra = async (nombre, email, tel, direccion, cantidad, comentarios, producto, precio, capacidad) => {
    const mailOptions = {
        from: `"${nombre}" <${process.env.EMAIL_USER}>`,   
        to: process.env.EMAIL_USER,     
        subject: `Solicitud de Compra - ${producto}`,
        html: `
            <h2>Información del Cliente</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefono:</strong> ${tel}</p>
            <p><strong>Direccion:</strong> ${direccion}</p>
            <h3>Detalles de la Compra</h3>
            <p><strong>Producto:</strong> ${producto}</p>
            <p><strong>Precio:</strong> ${precio}</p>
            <p><strong>Capacidad:</strong> ${capacidad}</p>
            <p><strong>Cantidad:</strong> ${cantidad}</p>
            <h3>Comentarios del Cliente</h3>
            <p>${comentarios}</p>
        `
    };

    await transporter.sendMail(mailOptions);
};



// Función para enviar correo de solicitud de servicio
const enviarCorreoServicio = async (nombre, email, telefono, direccion, tipoServicio, descripcion) => {
    const mailOptions = {
        from: `"${nombre}" <${process.env.EMAIL_USER}>`,   // Remitente (con nombre personalizado)
        to: process.env.EMAIL_USER,                         // Destinatario (tu correo)
        subject: `Nueva Solicitud de Servicio - ${tipoServicio}`,
        html: `
            <h2>Información del Cliente</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Dirección:</strong> ${direccion}</p>
            <h3>Detalles del Servicio Solicitado</h3>
            <p><strong>Tipo de Servicio:</strong> ${tipoServicio}</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
        `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
};


const enviarCorreoContacto = async (nombre, email, mensaje) => {
    const mailOptions = {
        from: `"${nombre}" <${process.env.EMAIL_USER}>`, // Remitente
        to: process.env.EMAIL_USER, // Destinatario (tu correo)
        subject: `Nuevo Mensaje de Contacto de ${nombre}`,
        html: `
            <h2>Mensaje de Contacto</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3>Mensaje</h3>
            <p>${mensaje}</p>
        `
    };

    await transporter.sendMail(mailOptions);
};


// Exporta las 3 funciones dentro de un objeto
module.exports = {
    enviarCorreoCompra,
    enviarCorreoServicio, 
    enviarCorreoContacto
};
