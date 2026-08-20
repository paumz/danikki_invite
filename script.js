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
    }
};

botones.forEach((boton) => {
    boton.addEventListener("click", () => {

        const id = boton.id;

        // Si el mismo botón ya estaba abierto, cerramos el panel
        if (boton.classList.contains("activo")) {
            boton.classList.remove("activo");
            panel.classList.remove("activo");

            return;
        }

        // Quitamos el estado activo de los demás botones
        botones.forEach((b) => {
            b.classList.remove("activo");
        });

        // Activamos el botón seleccionado
        boton.classList.add("activo");

        // Cambiamos el contenido
        titulo.textContent = informacion[id].titulo;
        texto.innerHTML = informacion[id].texto;

        // Mostramos el panel
        panel.classList.add("activo");

    });
});
