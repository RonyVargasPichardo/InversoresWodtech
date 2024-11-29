// Manejo del modal de inicio de sesión y formulario
document.addEventListener("DOMContentLoaded", function () {
    // Elementos del modal
    const modalLogin = document.getElementById("modal-login");
    const cerrarModalLogin = document.querySelector(".cerrar-modal-login");
    const openModalBtn = document.getElementById("openModalBtn");

    // Formulario de inicio de sesión
    const formularioLogin = document.getElementById("formulario-login");

    // Función para abrir el modal
    openModalBtn.onclick = function () {
        modalLogin.style.display = "flex";
    };

    // Función para cerrar el modal
    cerrarModalLogin.onclick = function () {
        modalLogin.style.display = "none";
    };

    // Cerrar el modal al hacer clic fuera del contenido
    window.onclick = function (event) {
        if (event.target === modalLogin) {
            modalLogin.style.display = "none";
        }
    };

    // Manejo del formulario de inicio de sesión
    formularioLogin.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar el envío por defecto

        // Capturar los datos del formulario
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        // Mostrar un indicador de carga en el botón
        const botonLogin = document.querySelector(".btn-login-modal");
        botonLogin.textContent = "Ingresando...";
        botonLogin.disabled = true;

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el token en localStorage
                localStorage.setItem("token", data.token);

                // Cerrar el modal y redirigir al panel de administración
                modalLogin.style.display = "none";
                window.location.href = "/admin-panel.html"; // Cambia a la ruta de tu panel
            } else {
                // Mostrar error si las credenciales son inválidas
                alert(data.error || "Credenciales inválidas. Inténtalo nuevamente.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Hubo un problema al procesar tu solicitud. Inténtalo más tarde.");
        } finally {
            // Restaurar el botón de enviar
            botonLogin.textContent = "Ingresar";
            botonLogin.disabled = false;
        }
    });
});


// Modal de compra de inversor y de confirmación
document.addEventListener("DOMContentLoaded", function() {
    const modalCompra = document.getElementById("modal-compra");
    const cerrarModalCompra = document.querySelector(".cerrar-modal-compra");

    const modalConfirmacion = document.getElementById("modal-confirmacion");
    const cerrarModalConfirmacion = document.querySelector(".cerrar-modal-confirmacion");
    const botonOkModalConfirmacion = document.getElementById("modal-confirmacion-ok");

    // Elementos dinámicos del modal de confirmación
    const tituloConfirmacion = document.getElementById("modal-confirmacion-titulo");
    const mensajeConfirmacion = document.getElementById("modal-confirmacion-mensaje");

    // Función para mostrar el modal de confirmación con contenido dinámico
    function mostrarModalConfirmacion(titulo, mensaje) {
        tituloConfirmacion.textContent = titulo;
        mensajeConfirmacion.textContent = mensaje;
        modalConfirmacion.style.display = "flex";
    }

    // Cerrar el modal de confirmación al hacer clic en la "x"
    cerrarModalConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar el modal de confirmación al hacer clic en el botón "OK"
    botonOkModalConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar el modal de confirmación al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modalConfirmacion) {
            modalConfirmacion.style.display = "none";
        }
    });

    // Función para enviar la compra y controlar los modales
    async function enviarCompra(event) {
        event.preventDefault();

        // Referencias al botón y spinner
        const btnConfirmarCompra = document.querySelector(".btn-enviar-compra");
        const spinner = document.createElement("span");
        spinner.classList.add("spinner"); // Agrega un estilo de spinner si es necesario
        spinner.textContent = " Cargando...";

        // Deshabilitar el botón y agregar el spinner
        btnConfirmarCompra.disabled = true;
        btnConfirmarCompra.appendChild(spinner);

        try {
            const nombre = document.getElementById('nombre-compra').value;
            const email = document.getElementById('email-compra').value;
            const tel = document.getElementById('telefono-compra').value;
            const direccion = document.getElementById('direccion-compra').value;
            const cantidad = document.getElementById('cantidad-compra').value;
            const comentarios = document.getElementById('comentarios-compra').value;
            const producto = document.getElementById('producto-nombre').textContent;
            const precio = document.getElementById('producto-precio').textContent;
            const capacidad = document.getElementById('producto-capacidad').textContent;

            const response = await fetch('http://localhost:3000/api/enviar-compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email, tel, direccion, cantidad, comentarios, producto, precio, capacidad })
            });

            if (response.ok) {
                // Limpiar el formulario
                document.getElementById('formulario-compra').reset();

                // Cerrar el modal de compra
                modalCompra.style.display = "none";

                // Mostrar el modal de confirmación con mensaje de compra
                mostrarModalConfirmacion(
                    "¡Solicitud de Compra Enviada!",
                    "Gracias por tu compra. Nos comunicaremos contigo en un plazo de 24 a 48 horas para confirmar los detalles."
                );
            } else {
                alert("Hubo un problema al enviar tu solicitud, intenta nuevamente");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud de compra:", error);
            alert("Ocurrió un error inesperado. Por favor, inténtalo nuevamente.");
        } finally {
            // Restaurar el estado del botón y spinner
            btnConfirmarCompra.disabled = false;
            spinner.remove();
        }
    }

    // Asignar la función de envío de compra al formulario
    document.getElementById('formulario-compra').addEventListener('submit', enviarCompra);
});









// Modal de Solicitud de Servicio y Confirmación
document.addEventListener("DOMContentLoaded", function () {
    const modalServicio = document.getElementById("modal-solicitud-servicio");
    const cerrarModalServicio = document.querySelector(".cerrar-modal-servicio");

    const modalConfirmacion = document.getElementById("modal-confirmacion");
    const cerrarModalConfirmacion = document.querySelector(".cerrar-modal-confirmacion");
    const botonOkModalConfirmacion = document.getElementById("modal-confirmacion-ok");

    // Elementos dinámicos del modal de confirmación
    const tituloConfirmacion = document.getElementById("modal-confirmacion-titulo");
    const mensajeConfirmacion = document.getElementById("modal-confirmacion-mensaje");

    // Función para mostrar el modal de confirmación con contenido dinámico
    function mostrarModalConfirmacion(titulo, mensaje) {
        tituloConfirmacion.textContent = titulo;
        mensajeConfirmacion.textContent = mensaje;
        modalConfirmacion.style.display = "flex";
    }

    // Función para abrir el modal de servicio
    function abrirModalServicio() {
        modalServicio.style.display = "flex"; // Mostrar el modal de servicio
    }

    // Función para asignar eventos a los botones dinámicos
    function asignarEventosBotonesServicio() {
        const botonesSolicitudServicio = document.querySelectorAll(".btn-solicitud");

        botonesSolicitudServicio.forEach(boton => {
            boton.removeEventListener("click", abrirModalServicio); // Evita duplicar eventos
            boton.addEventListener("click", (event) => {
                event.preventDefault();
                abrirModalServicio();
            });
        });
    }

    // Asignar eventos iniciales a los botones existentes
    asignarEventosBotonesServicio();

    // Cerrar el modal de servicio al hacer clic en la "x"
    cerrarModalServicio.addEventListener("click", () => {
        modalServicio.style.display = "none";
    });

    // Cerrar el modal de servicio al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modalServicio) {
            modalServicio.style.display = "none";
        }
    });

    // Cerrar el modal de confirmación al hacer clic en la "x"
    cerrarModalConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar el modal de confirmación al hacer clic en el botón "OK"
    botonOkModalConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar el modal de confirmación al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modalConfirmacion) {
            modalConfirmacion.style.display = "none";
        }
    });

    // Función para enviar el formulario del servicio
    async function enviarServicio(event) {
        event.preventDefault();

        // Referencias al botón y spinner
        const btnEnviarServicio = document.querySelector(".btn-enviar-servicio");
        const spinner = document.createElement("span");
        spinner.classList.add("spinner"); // Agrega un estilo de spinner si es necesario
        spinner.textContent = " Cargando...";

        // Deshabilitar el botón y agregar el spinner
        btnEnviarServicio.disabled = true;
        btnEnviarServicio.appendChild(spinner);

        try {
            const nombre = document.getElementById("nombre-servicio").value;
            const email = document.getElementById("email-servicio").value;
            const telefono = document.getElementById("telefono-servicio").value;
            const direccion = document.getElementById("direccion-servicio").value;
            const tipoServicio = document.getElementById("tipo-servicio").value;
            const descripcion = document.getElementById("descripcion-servicio").value;

            const bodyData = JSON.stringify({
                nombre,
                email,
                telefono,
                direccion,
                tipoServicio,
                descripcion,
            });

            const response = await fetch("http://localhost:3000/api/enviar-servicio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: bodyData,
            });

            if (response.ok) {
                // Limpiar el formulario
                document.getElementById("formulario-servicio").reset();

                // Cerrar el modal de servicio
                modalServicio.style.display = "none";

                // Mostrar el modal de confirmación con mensaje de servicio
                mostrarModalConfirmacion(
                    "¡Solicitud de Servicio Enviada!",
                    "Gracias por tu solicitud. Nos comunicaremos contigo en un plazo de 24 a 48 horas para confirmar los detalles."
                );
            } else {
                alert("Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud de servicio:", error);
            alert("Ocurrió un error inesperado. Por favor, inténtalo nuevamente.");
        } finally {
            // Restaurar el estado del botón y eliminar el spinner
            btnEnviarServicio.disabled = false;
            spinner.remove();
        }
    }

    // Asignar la función de envío al formulario del servicio
    const formularioServicio = document.getElementById("formulario-servicio");
    formularioServicio.addEventListener("submit", enviarServicio);

    // Llamar a esta función después de cargar dinámicamente los botones
    window.actualizarEventosBotonesServicio = asignarEventosBotonesServicio;
});




    function toggleMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    }











    
    
    // Función para cargar inversores
    async function cargarInversores(url, containerSelector) {
        try {
            const response = await fetch(url);
            const inversores = await response.json();
    
            const container = document.querySelector(containerSelector);
            container.innerHTML = ''; // Limpia el contenido previo
    
            inversores.forEach(inversor => {
                const productoHTML = `
                    <div class="producto">
                        <img src="${inversor.imagen}" alt="${inversor.nombre}">
                        <h4>${inversor.nombre}</h4>
                        <p class="especificaciones">${inversor.especificaciones}</p>
                        <p class="precio">$${inversor.precio.toLocaleString()}</p>
                        <a class="btn btn-compra" 
                           data-nombre="${inversor.nombre}" 
                           data-precio="${inversor.precio}" 
                           data-capacidad="${inversor.especificaciones}">
                            Comprar
                        </a>
                    </div>
                `;
                container.innerHTML += productoHTML;
            });
    
            // Asignar eventos a los botones de compra
            asignarEventosBotonesCompra();
        } catch (error) {
            console.error(`Error al cargar los inversores desde ${url}:`, error);
        }
    }
    
    // Función para asignar eventos a los botones de compra
    function asignarEventosBotonesCompra() {
        const botonesCompra = document.querySelectorAll(".btn-compra");
    
        botonesCompra.forEach(boton => {
            boton.addEventListener("click", (event) => {
                event.preventDefault(); // Evitar comportamiento predeterminado
    
                const nombre = boton.getAttribute("data-nombre");
                const precio = boton.getAttribute("data-precio");
                const capacidad = boton.getAttribute("data-capacidad");
    
                // Insertar datos en el modal
                const modalCompra = document.getElementById("modal-compra");
                const productoNombre = document.getElementById("producto-nombre");
                const productoPrecio = document.getElementById("producto-precio");
                const productoCapacidad = document.getElementById("producto-capacidad");
    
                productoNombre.textContent = nombre;
                productoPrecio.textContent = precio;
                productoCapacidad.textContent = capacidad;
    
                // Mostrar el modal
                modalCompra.style.display = "flex";
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Cargar inversores Woctech
        cargarInversores('http://localhost:3000/api/woctech', '.bloque-inversores.woctech .productos-grid');
    
        // Cargar inversores Microlite
        cargarInversores('http://localhost:3000/api/microlite', '.bloque-inversores.microlite .productos-grid');
    });
    
    


 // Función para cargar servicios
    async function cargarServicios() {
        try {
            const response = await fetch('http://localhost:3000/api/servicios');
            const servicios = await response.json();
    
            const container = document.querySelector('.servicios-contenedor');
            container.innerHTML = ''; // Limpia el contenido previo
    
            servicios.forEach(servicio => {
                const beneficiosHTML = servicio.beneficios.map(beneficio => `<li>${beneficio}</li>`).join('');
    
                const servicioHTML = `
                    <div class="servicio">
                        <h3>${servicio.titulo}</h3>
                        <p>${servicio.descripcion}</p>
                        <h4>Incluye:</h4>
                        <ul>${beneficiosHTML}</ul>
                        <p>${servicio.detalle}</p>
                    </div>
                `;
                container.innerHTML += servicioHTML;
            });
        } catch (error) {
            console.error('Error al cargar los servicios:', error);
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        cargarServicios();
    });



    
    // Función para cargar las tarjetas de servicio
async function cargarTarjetasServicio() {
    try {
        const response = await fetch('http://localhost:3000/api/tarjetas-servicio');
        const tarjetas = await response.json();

        const container = document.querySelector('.tarjetas-servicio');
        container.innerHTML = ''; // Limpia el contenido previo

        tarjetas.forEach(tarjeta => {
            const tarjetaHTML = `
                <div class="tarjeta">
                    <div class="icono">
                        <img src="${tarjeta.imagen}" alt="Icono de ${tarjeta.titulo}">
                    </div>
                    <h3>${tarjeta.titulo}</h3>
                    <p>${tarjeta.descripcion}</p>
                    <a href="#" class="btn-solicitud">${tarjeta.boton}</a>
                </div>
            `;
            container.innerHTML += tarjetaHTML;
        });

        // Actualizar eventos para los botones dinámicos
        window.actualizarEventosBotonesServicio();
    } catch (error) {
        console.error('Error al cargar las tarjetas de servicio:', error);
    }
}

// Llamar a la función para cargar tarjetas al cargar la página
document.addEventListener("DOMContentLoaded", cargarTarjetasServicio);





// Función para cargar la información de contacto
async function cargarInformacionContacto() {
    try {
        const response = await fetch('http://localhost:3000/api/info-contacto');
        const info = await response.json();

        // Llenar los datos básicos de contacto
        const infoContainer = document.getElementById('info-dinamica-contacto');
        infoContainer.innerHTML = `
            <p><strong>Teléfono:</strong> ${info.telefono}</p>
            <p><strong>Email:</strong> <a href="mailto:${info.email}">${info.email}</a></p>
            <p><strong>Dirección:</strong> ${info.direccion}</p>
        `;

        // Llenar las redes sociales
        const redesContainer = document.getElementById('redes-sociales');
        redesContainer.innerHTML = `
            <a href="${info.redesSociales.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="${info.redesSociales.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="${info.redesSociales.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        `;
    } catch (error) {
        console.error('Error al cargar la información de contacto:', error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarInformacionContacto);





// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const formularioContacto = document.getElementById('formulario-contacto');

    // Referencias al modal de confirmación
    const modalConfirmacion = document.getElementById("modal-confirmacion");
    const tituloConfirmacion = document.getElementById("modal-confirmacion-titulo");
    const mensajeConfirmacion = document.getElementById("modal-confirmacion-mensaje");
    const cerrarModalConfirmacion = document.querySelector(".cerrar-modal-confirmacion");
    const botonOkModalConfirmacion = document.getElementById("modal-confirmacion-ok");

    // Función para mostrar el modal de confirmación
    function mostrarModalConfirmacion(titulo, mensaje) {
        tituloConfirmacion.textContent = titulo;
        mensajeConfirmacion.textContent = mensaje;
        modalConfirmacion.style.display = "flex";
    }

    // Cerrar el modal de confirmación al hacer clic en la "x"
    cerrarModalConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar el modal de confirmación al hacer clic en el botón "OK"
    botonOkModalConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar el modal de confirmación al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modalConfirmacion) {
            modalConfirmacion.style.display = "none";
        }
    });

    formularioContacto.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío por defecto

        // Capturar los datos del formulario
        const nombre = document.getElementById('nombre-contacto').value;
        const email = document.getElementById('email-contacto').value;
        const mensaje = document.getElementById('mensaje-contacto').value;

        // Mostrar un indicador de carga en el botón
        const botonEnviar = document.querySelector('.btn-enviar-contacto');
        botonEnviar.textContent = 'Enviando...';
        botonEnviar.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/enviar-contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, email, mensaje }),
            });

            if (response.ok) {
                formularioContacto.reset(); // Limpiar el formulario

                // Mostrar el modal de confirmación con mensaje personalizado
                mostrarModalConfirmacion(
                    "¡Mensaje Enviado!",
                    "Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible."
                );
            } else {
                alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al enviar el mensaje de contacto:', error);
            alert('Ocurrió un error inesperado. Por favor, inténtalo nuevamente.');
        } finally {
            // Restaurar el botón de enviar
            botonEnviar.textContent = 'Enviar Mensaje';
            botonEnviar.disabled = false;
        }
    });
});
