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
        texto: "Próximamente<br>Puebla, México"
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

    document.getElementById("dias").textContent =
        String(dias).padStart(2, "0");

    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");
}

actualizarCuentaRegresiva();

setInterval(actualizarCuentaRegresiva, 1000);

/*Confirmación de asistencia*/
const botonConfirmar = document.getElementById("confirmar-btn");

if (botonConfirmar) {
    botonConfirmar.addEventListener("click", function(event) {
        event.preventDefault();

        const parametros = new URLSearchParams(window.location.search);

        window.location.href = `confirmar.html?${parametros.toString()}`;
    });
}
