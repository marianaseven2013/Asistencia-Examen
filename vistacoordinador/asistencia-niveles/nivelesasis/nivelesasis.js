function nivelesasis() {
    let contenedor = document.createElement('div');
    contenedor.className = "nivelesasis-container";

    let grande = document.createElement('div');
    grande.className = "nivelesasis-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = "Asistencia por Niveles";
    contenedor.appendChild(titulo);

    let subtitulo = document.createElement('h2');
    subtitulo.textContent = "Seleccione el nivel a gestionar";
    contenedor.appendChild(subtitulo);

    const niveles = ["Pre-Primaria", "Primaria", "Básicos", "Diversificado"];
    
    niveles.forEach(nivel => {
        let boton = document.createElement('button');
        boton.className = "nivel-boton";
        boton.textContent = nivel;
        
        boton.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarGradoAsis', {
                detail: { nivelSeleccionado: nivel },
                bubbles: true
            });
            contenedor.dispatchEvent(evento);
        });
        
        grande.appendChild(boton);
    });

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "nivel-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverProyeccion', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { nivelesasis };