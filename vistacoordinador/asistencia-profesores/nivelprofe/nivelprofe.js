function nivelprofe() {
    let contenedor = document.createElement('div');
    contenedor.className = "nivelprofe-container";

    let grande = document.createElement('div');
    grande.className = "nivelprofe-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = "Nivel del profesor";
    contenedor.appendChild(titulo);

    let subtitulo = document.createElement('h2');
    subtitulo.textContent = "Seleccione el nivel a gestionar";
    contenedor.appendChild(subtitulo);

    const niveles = ["Pre-Primaria", "Primaria", "Básicos", "Diversificado"];
    
    niveles.forEach((nivel, index) => {
        let boton = document.createElement('button');
        boton.className = `nivel-boton boton-${index + 1}`;
        boton.textContent = nivel;
        
        boton.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarGradoProfe', {
                detail: { nivelSeleccionado: nivel }
            });
            document.dispatchEvent(evento);
        });
        
        grande.appendChild(boton);
    });

    // Botón regresar a proyecciones
    let botonRegresar = document.createElement('button');
    botonRegresar.className = "nivel-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverProyeccion');
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { nivelprofe };
