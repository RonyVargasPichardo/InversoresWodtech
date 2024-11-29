const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const connectDB = require('./db'); // Importa la función para conectar a MongoDB
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Llamar la función para conectar a la base de datos
connectDB();

// Middleware para permitir solicitudes de otros orígenes
app.use(cors());

// Middleware para manejar datos JSON
app.use(express.json());

// Usa las rutas definidas en routes.js
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
