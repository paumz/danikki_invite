const botones = document.querySelectorAll(".opcion");

const panel = document.getElementById("info-panel");
const titulo = document.getElementById("info-titulo");
const texto = document.getElementById("info-texto");

const informacion = {
    fecha: {
        titulo: "FECHA",
        texto: "31 de octubre de 2026<br>18:00 hrs"
    },

    lugar: {
        titulo: "LUGAR",
        texto: `
                Makky Salón Jardín<br>
                Ruta Quetzalcóatl 8, Los Gallos, 72510 San Andrés Cholula, Pue.<br><br>
        
                <a href="https://maps.app.goo.gl/rG18pAyRqdzLNYYs6"
                   target="_blank"
                   class="mapa-link">
                   ✦ MAPA ↗ ✦
                </a>
    `
    },

    dresscode: {
        titulo: "DRESSCODE",
        texto: "Una noche, un color; negro."
    },

    invitados:{
        titulo: "",
        texto: ""
    }
};

const parametros = new URLSearchParams(window.location.search);
const nombre = parametros.get("nombre");
const numeroInvitados = parametros.get("inv") || "1";
const acompanamiento = document.getElementById("acomp");

const saludo = document.getElementById("saludo");
if (nombre) {
    saludo.textContent = `${nombre}:`;
}
if (Number(numeroInvitados) > 1) {
    acompanamiento.textContent = "con ustedes";
} else {
    acompanamiento.textContent = "contigo";
}

botones.forEach((boton) => {
    boton.addEventListener("click", () => {

        const id = boton.id;

        // abre y cierra el papoi
        if (boton.classList.contains("activo")) {
            boton.classList.remove("activo");
            panel.classList.remove("activo");

            return;
        }

        // adios activo
        botones.forEach((b) => {
            b.classList.remove("activo");
        });

        // activa el clic
        boton.classList.add("activo");

        // cambiando el contenidoooo
        /*
        titulo.textContent = informacion[id].titulo;
        texto.innerHTML = informacion[id].texto;
        */
        titulo.textContent = informacion[id].titulo;

        if (id === "invitados") {
        
            if (numeroInvitados === "1") {
                texto.innerHTML = `
                    Esta invitación está reservada para<br>
                    <strong>1 PERSONA</strong>
                `;
            } else {
                texto.innerHTML = `
                    Esta invitación está reservada para<br>
                    <strong>${numeroInvitados} PERSONAS</strong>
                `;
            }
        
        } else {
            texto.innerHTML = informacion[id].texto;
        }

        // muestra panel
        panel.classList.add("activo");

    });
});

/*conteooo*/

const fechaBoda = new Date("2026-10-31T18:00:00");

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);


/* BLOQUEAR ARRASTRE, CLICK Y MENÚ EN FOTOS */

document.querySelectorAll(".marquesina img").forEach((imagen) => {

    imagen.addEventListener("click", (event) => {
        event.preventDefault();
    });

    imagen.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    imagen.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

});

/* MÚSICA DE FONDO */

const musica = document.getElementById("musica");
const controlMusica = document.getElementById("control-musica");

/* CAMBIAR A VISTA DE CONFIRMACIÓN */

const botonConfirmar = document.getElementById("confirmar-btn");
const vistaInvitacion = document.getElementById("vista-invitacion");
const vistaConfirmacion = document.getElementById("vista-confirmacion");
const contenidoOriginalConfirmacion = vistaConfirmacion.innerHTML;

if (botonConfirmar && vistaInvitacion && vistaConfirmacion) {
    botonConfirmar.addEventListener("click", function(event) {
        event.preventDefault();
        restaurarConfirmacion();
        cargarInformacionConfirmacion();
        vistaInvitacion.style.display = "none";
        vistaConfirmacion.classList.add("activa");
        window.scrollTo(0, 0);
    });
}

/* REGRESAR AL INICIO DESDE CONFIRMACIÓN */

const botonVolverInicial = document.getElementById("volver-inicio");
if (botonVolverInicial) {
    botonVolverInicial.addEventListener("click", volverALaInvitacion);
}

/* ABRIR INVITACIÓN */

const pantallaInicial = document.getElementById("pantalla-inicial");
const botonAbrir = document.getElementById("abrir-invitacion");

document.body.classList.add("bloquear-scroll");

if (botonAbrir) {
    botonAbrir.addEventListener("click", () => {
        // Iniciar música en  la interacción owo
        musica.play()
            .then(() => {
                actualizarBotonMusica();
            })
            .catch(() => {
                actualizarBotonMusica();
            });

        // Ocultar pantalla del sobre
        pantallaInicial.classList.add("oculta");
        document.body.classList.remove("bloquear-scroll");
        window.scrollTo(0, 0);
    });
}

/* Play / Pause manual */

controlMusica.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        sessionStorage.setItem("musicaActiva", "true");
    } else {
        musica.pause();
        sessionStorage.setItem("musicaActiva", "false");
    }
});


/* Actualizar icono */

musica.addEventListener("play", actualizarBotonMusica);
musica.addEventListener("pause", actualizarBotonMusica);

/* GUARDAR POSICIÓN DE LA MÚSICA */

setInterval(() => {
    if (!musica.paused) {
        sessionStorage.setItem("musicaTiempo", musica.currentTime);
        sessionStorage.setItem("musicaActiva", "true");
    }
}, 500);

//post-migracion

/* =========================   LÓGICA DE CONFIRMACIÓN========================= */

/* Datos del invitado */

const idInvitado = parametros.get("id");
const invitadosConfirmacion = Number(parametros.get("inv")) || 1;
const nombreInvitado = document.getElementById("nombre-invitado");
const mensajeInvitados = document.getElementById("mensaje-invitados");
const preguntaConfirmacion = document.querySelector("#vista-confirmacion .pregunta");

/* Registrar respuesta */

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxdtlqF3OGMObzldKrhWi6TLT5pH5WHpLl54oP2arW27FAPgfIABWUL4qGQ2NtslwISXQ/exec";


/* Botones SÍ / NO */

const botonSi = document.getElementById("confirmar-si");
const botonNo = document.getElementById("confirmar-no");

if (botonSi) {
    botonSi.addEventListener("click", () => {
        registrarRespuesta("Sí");
    });
}

if (botonNo) {
    botonNo.addEventListener("click", () => {
        registrarRespuesta("No");
    });
}

/* Cargar información al abrir confirmación */

const botonConfirmacion = document.getElementById("confirmar-btn");
if (botonConfirmacion) {
    botonConfirmacion.addEventListener("click", () => {
        cargarInformacionConfirmacion();
    });
}

//FUNCIONES!!!

function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferencia = fechaBoda - ahora;
    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
        return;
    }
    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );
    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );
    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );
    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );
    document.getElementById("dias").textContent = String(dias).padStart(2, "0");
    document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

function actualizarBotonMusica() {
    if (musica.paused) {
        controlMusica.textContent = "▶ Play";
        controlMusica.setAttribute(
            "aria-label",
            "Reproducir música"
        );
        controlMusica.title = "Reproducir música";
    } else {
        controlMusica.textContent = "▐▐ Pause";
        controlMusica.setAttribute(
            "aria-label",
            "Pausar música"
        );
        controlMusica.title = "Pausar música";
    }
}

function restaurarConfirmacion() {
    vistaConfirmacion.innerHTML = contenidoOriginalConfirmacion;
    inicializarConfirmacion();
}

function volverALaInvitacion(event) {
    event.preventDefault();
    vistaConfirmacion.classList.remove("activa");
    vistaInvitacion.style.display = "block";
    window.scrollTo(0, 0);

}
/* Preparar información de confirmación */

function cargarInformacionConfirmacion() {

    const nombreInvitado = document.getElementById("nombre-invitado");
    const mensajeInvitados = document.getElementById("mensaje-invitados");
    const preguntaConfirmacion = document.querySelector("#vista-confirmacion .pregunta");

    if (nombre) {
        nombreInvitado.textContent = nombre;
    } else {
        nombreInvitado.textContent = "Querido invitado";
    }

    if (invitadosConfirmacion === 1) {
        mensajeInvitados.innerHTML = `
            Hemos reservado <strong>1 asiento</strong> para ti.
        `;
        preguntaConfirmacion.textContent =
            "¿Tendremos el placer de contar contigo?";
    } else {
        mensajeInvitados.innerHTML = `
            Hemos reservado <strong>${invitadosConfirmacion} asientos</strong> para ustedes.
        `;
        preguntaConfirmacion.textContent =
            "¿Tendremos el placer de contar con su presencia?";
    }

}

function registrarRespuesta(respuesta) {
    const datos = {
        id: idInvitado,
        nombre: nombre || "Querido invitado",
        invitados: invitadosConfirmacion,
        respuesta: respuesta
    };

    fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify(datos)
    })

    .then(() => {

        console.log("Respuesta registrada");
        mostrarConfirmacion(respuesta);
    })

    .catch((error) => {
        console.error("Error:", error);
        alert(
            "Hubo un problema al registrar tu respuesta."
        );
    });
}
function mostrarConfirmacion(respuesta) {
    if (respuesta === "Sí") {
        vistaConfirmacion.innerHTML = `
            <h1>PAU<br>&<br>DAN</h1>
            <p class="subtitulo">
                ASISTENCIA CONFIRMADA
            </p>
            <div class="separador">✦</div>
            <p class="saludo-confirmacion">
                Nos encantará celebrar contigo.
            </p>
            <p>
                Gracias por formar parte de este capítulo
                de nuestra historia.
            </p>
            <a href="#" class="volver-inicio" id="volver-inicio">
                ← REGRESAR AL INICIO
            </a>
        `;
    } else {
        vistaConfirmacion.innerHTML = `
            <h1>PAU<br> &<br> DAN</h1>
            <p class="subtitulo">
                RESPUESTA RECIBIDA
            </p>
            <div class="separador">✦</div>
            <p class="saludo-confirmacion">
                Te extrañaremos esa noche.
            </p>
            <p>
                Gracias por formar parte de nuestra historia, 
                aunque sea a la distancia.
            </p>
            <a href="#" class="volver-inicio" id="volver-inicio">
                ← REGRESAR AL INICIO
            </a>
        `;
    }
    configurarBotonVolver();
}

function configurarBotonVolver() {
    const botonVolver = document.getElementById("volver-inicio");
    if (!botonVolver) return;
    botonVolver.addEventListener(
        "click",
        volverALaInvitacion
    );
}

function inicializarConfirmacion() {
    const botonSi = document.getElementById("confirmar-si");
    const botonNo = document.getElementById("confirmar-no");
    if (botonSi) {
        botonSi.addEventListener("click", () => {
            mostrarLoading(botonSi);
            registrarRespuesta("Sí");
        });
    }
    if (botonNo) {
        botonNo.addEventListener("click", () => {
            mostrarLoading(botonNo);
            registrarRespuesta("No");
        });
    }
    const botonVolver = document.getElementById("volver-inicio");
    if (botonVolver) {
        botonVolver.addEventListener("click", volverALaInvitacion);
    }

}

function mostrarLoading(botonSeleccionado) {

    const botonSi = document.getElementById("confirmar-si");
    const botonNo = document.getElementById("confirmar-no");

    // Bloqueamos ambos botones
    if (botonSi) {
        botonSi.disabled = true;
    }

    if (botonNo) {
        botonNo.disabled = true;
    }

    // Solo el botón seleccionado muestra el spinner
    botonSeleccionado.classList.add("cargando");

}