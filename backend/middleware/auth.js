const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Asegúrate de que esta ruta sea correcta
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    let token;

    // Verificar si el token se encuentra en los headers de autorización
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extraer el token

            // Verificar el token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Buscar al administrador en la base de datos
            req.admin = await Admin.findById(decoded.id).select('-password'); // Excluir la contraseña

            if (!req.admin) {
                return res.status(401).json({ error: 'Acceso no autorizado' });
            }

            next(); // Permitir el acceso a la ruta protegida
        } catch (error) {
            console.error('Error al verificar el token:', error);
            return res.status(401).json({ error: 'Token no válido' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado, falta el token' });
    }
};

module.exports = { protect };
