const parametros = new URLSearchParams(window.location.search);

const nombre = parametros.get("nombre");
const invitados = Number(parametros.get("inv")) || 1;

const nombreInvitado = document.getElementById("nombre-invitado");
const mensajeInvitados = document.getElementById("mensaje-invitados");
const pregunta = document.querySelector(".pregunta");


/* Nombre */

if (nombre) {
    nombreInvitado.textContent = nombre;
}


/* Número de invitados */

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
        "¿Tendremos el placer de contar con ustedes?";
}


/* Botones */

document.getElementById("confirmar-si").addEventListener("click", () => {

    console.log("Asistencia confirmada");

});


document.getElementById("confirmar-no").addEventListener("click", () => {

    console.log("Asistencia rechazada");

});
