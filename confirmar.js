const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");
const nombre = parametros.get("nombre");
const invitados = Number(parametros.get("inv")) || 1;

const nombreInvitado = document.getElementById("nombre-invitado");
const mensajeInvitados = document.getElementById("mensaje-invitados");
const pregunta = document.querySelector(".pregunta");


/* Nombre */
if (nombre) {
    nombreInvitado.textContent = nombre;
}


/* invitados */
if (invitados === 1) {
    mensajeInvitados.innerHTML = `
        Hemos reservado <strong>1 lugar</strong> para ti.
    `;
    pregunta.textContent =
        "¿Tendremos el placer de contar contigo?";
} else {
    mensajeInvitados.innerHTML = `
        Hemos reservado <strong>${invitados} lugares</strong> para ustedes.
    `;
    pregunta.textContent =
        "¿Tendremos el placer de contar con su presencia?";
}


/* buttonssss */
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxdtlqF3OGMObzldKrhWi6TLT5pH5WHpLl54oP2arW27FAPgfIABWUL4qGQ2NtslwISXQ/exec";
function registrarRespuesta(respuesta) {
    const datos = {
        id: id,
        nombre: nombre || "Querido invitado",
        invitados: invitados,
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

        alert("Hubo un problema al registrar tu respuesta.");
    });
}


document.getElementById("confirmar-si").addEventListener("click", () => {
    registrarRespuesta("Sí");
});


document.getElementById("confirmar-no").addEventListener("click", () => {
    registrarRespuesta("No");
});

//mostrat
function mostrarConfirmacion(respuesta) {

    const main = document.querySelector("main");

    if (respuesta === "Sí") {

        main.innerHTML = `
            <h1>PAU<br> &<br> DAN</h1>

            <p class="subtitulo">
                ASISTENCIA CONFIRMADA
            </p>

            <div class="separador">✦</div>

            <p class="saludo-confirmacion">
                Nos encantará celebrar contigo.
            </p>

            <p>
                Gracias por formar parte de este capítulo de nuestra historia.
            </p>

            <a href="#" class="volver-inicio" id="volver-inicio">
                ← REGRESAR AL INICIO
            </a>
            configurarBotonVolver();
        `;

    } else {

        main.innerHTML = `
            <h1>PAU & DAN</h1>

            <p class="subtitulo">
                RESPUESTA RECIBIDA
            </p>

            <div class="separador">✦</div>

            <p class="saludo-confirmacion">
                Te extrañaremos esa noche.
            </p>

            <p>
                Gracias por acompañarnos, aunque sea desde la distancia.
            </p>
            <a href="#" class="volver-inicio" id="volver-inicio">
                ← REGRESAR AL INICIO
            </a>
            configurarBotonVolver();
        `;
    }
}

//functions
function configurarBotonVolver() {
    const botonVolver = document.getElementById("volver-inicio");
    if (botonVolver) {
        botonVolver.addEventListener("click", function(event) {
            event.preventDefault();
            //const parametros = new URLSearchParams(window.location.search);
            //const query = parametros.toString();
            const query = window.location.search;
            /*window.location.href = query
                ? `index.html?${query}`
                : "index.html";*/
            window.location.href = `index.html${query}`;
        });
    }
}
