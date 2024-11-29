const express = require('express');
const router = express.Router();
const { enviarCorreoCompra, enviarCorreoServicio, enviarCorreoContacto } = require('./emailService'); // Importa ambas funciones




//para el inicio de secion 
const Admin = require('./models/Admin'); // Importa el modelo
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'miSuperSecreto'; // Cambia esto por una variable de entorno segura



// Ruta para registrar administradores
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        // Crear un nuevo administrador
        const admin = new Admin({ nombre, email, password });
        await admin.save(); // Guardar en la base de datos
        res.status(201).json({ message: "Administrador registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar administrador:", error);
        // Manejar errores como correos duplicados
        if (error.code === 11000) {
            res.status(400).json({ error: "El correo ya está registrado" });
        } else {
            res.status(500).json({ error: "Error al registrar administrador" });
        }
    }
});


// Ruta para el inicio de sesión de administradores
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        // Buscar administrador por correo
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Verificar la contraseña
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Generar el token
        const token = jwt.sign(
            { id: admin._id, email: admin.email }, // Payload
            JWT_SECRET, // Clave secreta
            { expiresIn: '1h' } // Opciones del token (1 hora de expiración)
        );

        // Responder con el token y un mensaje de éxito
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en login" });
    }
});



const { protect } = require('./middleware/auth');

// Ruta protegida para el panel de administración
router.get('/admin/panel', protect, (req, res) => {
    res.json({
        message: 'Bienvenido al panel de administración',
        admin: req.admin, // Información del administrador autenticado
    });
});





// Datos de Inversores Woctech
const inversoresWoctech = [
    {
        id: 1,
        nombre: "Inversor Woctech 1200W, 12V",
        especificaciones: "Inversor de onda cuadrada",
        precio: 7900,
        imagen: "https://media.istockphoto.com/id/1396831316/es/foto/inversor-de-energ%C3%ADa-solar.jpg?s=1024x1024&w=is&k=20&c=3zhNCUEjb5Os9C1nxMQQQafvwubTmMIWlZSICaJeyHk="
    },
    {
        id: 2,
        nombre: "Inversor Woctech 1500W, 12V",
        especificaciones: "Inversor de onda cuadrada",
        precio: 8900,
        imagen: "https://media.istockphoto.com/id/1696511112/es/foto/armario-de-control-el%C3%A9ctrico-de-c%C3%A9lula-solar-fotovoltaica-grid-tile-inverter-para-sistema.jpg?s=1024x1024&w=is&k=20&c=4mGq7A2YEXDkrsE-A7vMXEKl1tBG2SguyaTBzT78I1w="
    },
    {
        id: 3,
        nombre: "Inversor Woctech 2500W, 24V",
        especificaciones: "Inversor de onda cuadrada",
        precio: 14900,
        imagen: "https://media.istockphoto.com/id/1294510026/es/foto/cajas-de-conexiones-con-interruptores-el%C3%A9ctricos-dentro-de-una-casa-en-construcci%C3%B3n-en-una.jpg?s=1024x1024&w=is&k=20&c=joEyqiLeryN87NHqOJtB8O0Stin-SCLZ8-8fBxf2NVE="
    },
    {
        id: 4,
        nombre: "Inversor Woctech 3600W, 24V",
        especificaciones: "Inversor de onda cuadrada",
        precio: 18900,
        imagen: "https://media.istockphoto.com/id/1046209134/es/foto/varias-cajas-el%C3%A9ctricas-que-contienen-los-botones-y-la-pantalla-del-estado-del-sistema.jpg?s=1024x1024&w=is&k=20&c=FujLWl5c4OTcZeogsJJP6lYv9qTxC3bhAUNP7NmAFQA="
    }
];

// Datos de Inversores Microlite
const inversoresMicrolite = [
    {
        id: 1,
        nombre: "Inversor Microlite 1500W, 12V",
        especificaciones: "Inversor de onda pura",
        precio: 15900,
        imagen: "https://media.istockphoto.com/id/2049875765/es/foto/white-inverter-of-solar-cell-power-generation-system.jpg?s=1024x1024&w=is&k=20&c=XuFQpo4UljLOBTltV70m9PH1FvbaU8D55B5xQ_gnUuE="
    },
    {
        id: 2,
        nombre: "Inversor Microlite 1500W, 24V",
        especificaciones: "Inversor de onda pura",
        precio: 19900,
        imagen: "https://media.istockphoto.com/id/1976742828/es/foto/white-inverter-of-solar-cell-power-generation-system.jpg?s=1024x1024&w=is&k=20&c=-lpuQupOvDb22VoC5ANTLL2MuS6pLDWYTkWkTm3akfE="
    },
    {
        id: 3,
        nombre: "Inversor Microlite 2500W, 24V",
        especificaciones: "Inversor de onda pura",
        precio: 25900,
        imagen: "https://media.istockphoto.com/id/1480096758/es/foto/sistemas-de-soporte-para-paneles-solares.jpg?s=1024x1024&w=is&k=20&c=0saizDsVK2Eoiw_SKlGM34dFmwI4WLbZ3T0u6UIi5es="
    },
    {
        id: 4,
        nombre: "Inversor Microlite 3600W, 24V",
        especificaciones: "Inversor de onda pura",
        precio: 33900,
        imagen: "https://media.istockphoto.com/id/1329366004/es/foto/inversor-de-voltaje-abierto-en-la-parte-posterior-del-panel-solar.jpg?s=1024x1024&w=is&k=20&c=V3m9duhaOlqpBtLIwbQi4UORCgOhElV4xlbl3JQAKoQ="
    }
];

// Datos de nuestros servicios
const servicios = [
    {
        id: 1,
        titulo: "Venta de Inversores",
        descripcion: "Aquí en Inversores Wodtech encontrarás el inversor perfecto para un rendimiento óptimo en tu hogar y el cuidado adecuado de tus baterías.",
        beneficios: [
            "Garantía Full de 1 año en servicios y mantenimiento.",
            "Diversidad de capacidades para adaptarse a tus necesidades energéticas.",
            "Variedad de marcas reconocidas, como Inversores Wodtech y Microlite."
        ],
        detalle: "Ya sea que busques un equipo para uso doméstico o profesional, en Inversores Wodtech te ofrecemos calidad, seguridad y el respaldo de nuestras marcas líderes en el mercado."
    },
    {
        id: 2,
        titulo: "Reparación de Inversores",
        descripcion: "Nos especializamos en el mantenimiento y reparación de inversores de todas las marcas. Nuestro equipo de técnicos capacitados está listo para resolver problemas, ya sea de encendido, carga u otros inconvenientes.",
        beneficios: [
            "Fallas de encendido en inversores de cualquier marca.",
            "Reparación de cargadores para asegurar una carga eficiente y duradera.",
            "Actualización de firmware y ajustes de configuración.",
            "Optimización de rendimiento para asegurar la máxima eficiencia del equipo."
        ],
        detalle: "En Inversores Wodtech, garantizamos un servicio confiable y eficiente, asegurándonos de que tu equipo esté en perfectas condiciones para un funcionamiento óptimo."
    },
    {
        id: 3,
        titulo: "Servicio Técnico",
        descripcion: "Brindamos un servicio técnico completo a través de técnicos certificados de Inversores Wodtech. Nos aseguramos de que tu sistema funcione con la máxima eficiencia y seguridad.",
        beneficios: [
            "Instalación completa de inversores con soporte especializado.",
            "Mantenimiento preventivo para prolongar la vida útil y eficiencia de tu sistema.",
            "Atención personalizada para resolver cualquier inconveniente técnico."
        ],
        detalle: "Con nuestro servicio técnico, tendrás la tranquilidad de contar con el respaldo de un equipo experto que cuida de tu inversión energética en todo momento."
    }
];


// Datos de las ordenes de servicios
const tarjetasServicio = [
    {
        id: 1,
        titulo: "Instalación de Inversores",
        descripcion: "Configuración y puesta en marcha de nuevos equipos para asegurar el máximo rendimiento desde el inicio.",
        imagen: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        boton: "Solicitar Servicio"
    },
    {
        id: 2,
        titulo: "Mantenimiento Preventivo",
        descripcion: "Inspección y optimización regular para prolongar la vida útil de tus equipos de energía.",
        imagen: "https://images.pexels.com/photos/12741843/pexels-photo-12741843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        boton: "Solicitar Servicio"
    },
    {
        id: 3,
        titulo: "Reparación de Equipos",
        descripcion: "Diagnóstico y solución de fallas en inversores de cualquier marca para restaurar su funcionalidad.",
        imagen: "https://images.pexels.com/photos/2628105/pexels-photo-2628105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        boton: "Solicitar Servicio"
    },
    {
        id: 4,
        titulo: "Servicio Técnico",
        descripcion: "Asistencia técnica personalizada para resolver problemas complejos de tus equipos de energía.",
        imagen: "https://images.pexels.com/photos/288477/pexels-photo-288477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        boton: "Solicitar Servicio"
    }
];



// Datos de contacto
const informacionContacto = {
    telefono: "+123 456 7890",
    email: "contacto@inversoreswodtech.com",
    direccion: "Calle Principal 123, Ciudad, País",
    redesSociales: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com"
    }
};


// Endpoint para inversores Woctech
router.get('/woctech', (req, res) => {
    res.json(inversoresWoctech);
});

// Endpoint para inversores Microlite
router.get('/microlite', (req, res) => {
    res.json(inversoresMicrolite);
});

// Endpoint para los servicios 
router.get('/servicios', (req, res) => {
    res.json(servicios);
});

// Endpoint para las ordes de servicios 
router.get('/tarjetas-servicio', (req, res) => {
    res.json(tarjetasServicio);
});

router.get('/info-contacto', (req, res) => {
    res.json(informacionContacto);
});








// Ruta para manejar el envío de solicitudes de compra
router.post('/enviar-compra', async (req, res) => {
    const { nombre, email, tel, direccion, cantidad, comentarios, producto, precio, capacidad } = req.body;

    try {
        await enviarCorreoCompra(nombre, email, tel, direccion, cantidad, comentarios, producto, precio, capacidad);
        res.status(200).send({ message: "Solicitud de compra enviada correctamente" });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).send({ message: "Error al enviar la solicitud de compra" });
    }
});


// Ruta para manejar el envío de solicitudes de servicio
router.post('/enviar-servicio', async (req, res) => {
    const { nombre, email, telefono, direccion, tipoServicio, descripcion } = req.body;

    try {
        // Llamamos a la función para enviar el correo de servicio
        await enviarCorreoServicio(nombre, email, telefono, direccion, tipoServicio, descripcion);
        res.status(200).send({ message: "Solicitud de servicio enviada correctamente." });
    } catch (error) {
        console.error("Error al enviar el correo de servicio:", error);
        res.status(500).send({ message: "Error al enviar la solicitud de servicio." });
    }
});

// Endpoint para manejar el envío del formulario de contacto
router.post('/enviar-contacto', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    try {
        await enviarCorreoContacto(nombre, email, mensaje);
        res.status(200).send({ message: "Mensaje enviado correctamente." });
    } catch (error) {
        console.error("Error al enviar el mensaje de contacto:", error);
        res.status(500).send({ message: "Error al enviar el mensaje de contacto." });
    }
});

module.exports = router;
