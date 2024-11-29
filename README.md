Inversores Wodtech
Inversores Wodtech es un proyecto diseñado para gestionar la información de una empresa de inversores y servicios técnicos relacionados. Incluye un sitio web dinámico con un sistema de gestión para administradores, permitiendo visualizar y gestionar las solicitudes de contacto, compra y servicio.

Características del Proyecto
1. Frontend
Diseño responsivo e interactivo utilizando HTML, CSS y JavaScript.
Modal para:
Registro de administradores.
Inicio de sesión.
Formularios de contacto, compra y servicios.
Sección de contacto con información dinámica cargada desde el backend.
Carga de datos de servicios de forma dinámica.
2. Backend
Construido con Node.js y Express.
Utiliza MongoDB como base de datos para gestionar usuarios administradores y almacenar solicitudes.
Rutas creadas para manejar:
Registro e inicio de sesión de administradores.
Solicitudes de contacto, compra y servicio.
Datos dinámicos de servicios y contacto.
3. Autenticación
Implementación de autenticación con JWT (JSON Web Tokens) para garantizar el acceso seguro al panel administrativo.
4. Integración de Correo
Uso de Nodemailer para enviar notificaciones por correo electrónico al recibir solicitudes.
Requisitos Previos
Antes de empezar, asegúrate de tener instalados los siguientes programas:

Node.js: Descargar aquí
MongoDB: Descargar aquí
Git: Descargar aquí
Instalación y Configuración
Sigue estos pasos para configurar el proyecto en tu máquina local.

1. Clonar el Repositorio
bash
Copiar código
git clone https://github.com/RonyVargasPichardo/InversoresWodtech.git
cd InversoresWodtech
2. Instalar Dependencias
bash
Copiar código
cd backend
npm install
3. Configurar Variables de Entorno
Crea un archivo .env en la carpeta backend con las siguientes variables:

env
Copiar código
PORT=3000
MONGO_URI=mongodb://localhost:27017/wodtech
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña
JWT_SECRET=tu_secreto_super_seguro
4. Ejecutar el Servidor
bash
Copiar código
node server.js
5. Base de Datos MongoDB
Asegúrate de que MongoDB esté corriendo. Puedes usar el siguiente comando:

bash
Copiar código
mongod
Rutas del Backend
Método	Endpoint	Descripción
POST	/api/register	Registrar un nuevo administrador
POST	/api/login	Iniciar sesión como administrador
GET	/api/tarjetas-servicio	Obtener servicios disponibles
GET	/api/info-contacto	Obtener la información de contacto dinámica
POST	/api/enviar-contacto	Enviar solicitud de contacto
POST	/api/enviar-compra	Enviar solicitud de compra
POST	/api/enviar-servicio	Enviar solicitud de servicio
Estructura del Proyecto
bash
Copiar código
InversoresWodtech/
│
├── backend/
│   ├── models/               # Modelos de datos (Administrador, Solicitudes)
│   ├── routes.js             # Definición de rutas del backend
│   ├── server.js             # Archivo principal del servidor
│   ├── db.js                 # Conexión con MongoDB
│   ├── middleware/           # Middleware para autenticación
│   ├── emailService.js       # Lógica para el envío de correos electrónicos
│   └── .env                  # Variables de entorno (no se sube a Git)
│
├── frontend/
│   ├── index.html            # Página principal
│   ├── admin-panel.html      # Panel de administración
│   ├── css/                  # Estilos CSS
│   ├── js/                   # Lógica de frontend
│   └── img/                  # Imágenes del proyecto
│
└── README.md                 # Detalles del proyecto
Uso
1. Iniciar Sesión
Accede al modal de inicio de sesión.
Introduce las credenciales del administrador.
Si el inicio de sesión es exitoso, serás redirigido al panel de administración.
2. Panel de Administración
Visualiza las solicitudes recibidas clasificadas en:
Solicitudes de contacto.
Solicitudes de compra.
Solicitudes de servicio.
Gestiona las solicitudes en diferentes etapas.
3. Envío de Formularios
Usuarios pueden enviar solicitudes desde el sitio web principal:
Solicitud de contacto.
Compra de inversores.
Solicitud de servicios técnicos.
Tecnologías Utilizadas
Frontend
HTML5, CSS3, JavaScript.
Diseño responsivo y dinámico.
Backend
Node.js, Express.
MongoDB con Mongoose.
Nodemailer para envío de correos.
JWT para autenticación segura.
Contacto
Si tienes dudas o sugerencias, por favor contacta a través del correo:

📧 contacto@inversoreswodtech.com