# Inversores Wodtech

**Inversores Wodtech** es una plataforma que ofrece una experiencia integral para la gestión de solicitudes de compra, servicios y mensajes de contacto relacionados con inversores eléctricos. Además, incluye un sistema de administración para gestionar las solicitudes de manera eficiente.

El sistema está dividido en un frontend moderno y dinámico y un backend robusto con capacidades de autenticación, manejo de datos y comunicación mediante correo electrónico.


## Características principales

1.  **Autenticación para Administradores**:
    
    -   Los administradores pueden registrarse e iniciar sesión para acceder a un panel protegido.
    -   Se utiliza **JSON Web Tokens (JWT)** para manejar las sesiones de forma segura.
2.  **Gestión de Solicitudes**:
    
    -   Formulario de contacto para usuarios generales.
    -   Solicitudes de servicios técnicos y de mantenimiento.
    -   Sistema de compra de equipos.
    -   Envío de correos electrónicos automatizado para notificaciones de solicitudes.
3.  **Panel de Administración**:
    
    -   Una interfaz dedicada para que los administradores puedan visualizar, gestionar y organizar las solicitudes recibidas.
    -   División de solicitudes en categorías como **compra**, **servicio** y **contacto**.
4.  **Base de Datos MongoDB**:
    
    -   Almacena información de administradores y datos de solicitudes de manera estructurada.
    -   Gestión centralizada de usuarios y registros históricos.
5.  **Diseño Moderno y Funcional**:
    
    -   Interfaz de usuario diseñada para una experiencia intuitiva.
    -   Compatible con dispositivos móviles y de escritorio.

## Tecnologías utilizadas

### **Backend**

-   **Node.js**: Manejo del servidor y lógica de negocio.
-   **Express.js**: Framework minimalista para crear las API.
-   **MongoDB**: Base de datos no relacional para almacenar datos estructurados.
-   **Mongoose**: Modelado y validación de datos.
-   **JWT**: Manejo de autenticación segura.
-   **Nodemailer**: Envío de correos electrónicos.
-   **dotenv**: Manejo de configuraciones sensibles.

### **Frontend**

-   **HTML, CSS, JavaScript**: Tecnologías principales para la interfaz de usuario.
-   **Diseño adaptable (Responsive)**: Garantiza que la aplicación sea accesible desde cualquier dispositivo.

### **Herramientas Adicionales**

-   **Postman**: Para pruebas de las API.
-   **Git**: Control de versiones.
-   **Visual Studio Code**: IDE principal utilizado en el desarrollo.

## Estructura del proyecto

Inversores_Wodtech/
├── backend/
│   ├── models/          # Modelos de datos (Mongoose)
│   ├── routes/          # Definición de las rutas del servidor
│   ├── db.js            # Configuración de conexión con MongoDB
│   ├── server.js        # Configuración principal del servidor
│   ├── .env             # Variables de entorno sensibles
│   └── package.json     # Dependencias del backend
├── frontend/
│   ├── css/             # Archivos de estilos
│   ├── js/              # Lógica del frontend
│   ├── img/             # Imágenes utilizadas en la interfaz
│   ├── index.html       # Página principal del usuario
│   ├── admin-panel.html # Panel de administración
│   └── README.md        # Documentación del proyecto
└── README.md


## Configuración inicial

### **Requisitos**

-   **Node.js**: Descárgalo de [aquí](https://nodejs.org/).
-   **MongoDB**: Instala y ejecuta MongoDB en tu máquina.
-   **NPM**: Gestor de paquetes de Node.js.
-   **Editor de código**: Recomendado [VS Code](https://code.visualstudio.com/).

### **Instalación**

-   Clona este repositorio en tu máquina:
    
    bash
    
    Copiar código
    
    `git clone https://github.com/RonyVargasPichardo/InversoresWodtech.git
    cd InversoresWodtech` 
    
-   Configura las dependencias del backend:
    
    bash
    
    Copiar código
    
    `cd backend
    npm install` 
    
-   Configura tu archivo `.env` dentro de la carpeta `backend`:
    
    plaintext
    
    Copiar código
    
    `MONGO_URI=mongodb://localhost:27017/inversoreswodtech
    EMAIL_USER=tu_correo@gmail.com
    EMAIL_PASS=tu_contraseña
    JWT_SECRET=tu_secreto_super_seguro` 
    
-   Inicia MongoDB:
    
    bash
    
    Copiar código
    
    `mongod` 
    
-   Arranca el servidor backend:
    
    bash
    
    Copiar código
    
    `node server.js` 
    
-   Abre el frontend:
    
    -   Dirígete a la carpeta `frontend` y abre `index.html` en tu navegador.

## Rutas del Backend

### **Autenticación**

-   **POST** `/api/register`: Registra un nuevo administrador.
-   **POST** `/api/login`: Inicia sesión como administrador.

### **Solicitudes**

-   **POST** `/api/enviar-compra`: Enviar solicitud de compra.
-   **POST** `/api/enviar-servicio`: Enviar solicitud de servicio técnico.
-   **POST** `/api/enviar-contacto`: Enviar un mensaje de contacto.

### **Información**

-   **GET** `/api/info-contacto`: Información de contacto para mostrar dinámicamente.


# ## Contribuciones

Si deseas contribuir al proyecto:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4.  Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un pull request.

## Contacto

Si tienes dudas o sugerencias, por favor contacta a través del correo:

📧 **contacto@inversoreswodtech.com**
