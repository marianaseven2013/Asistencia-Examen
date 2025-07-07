function niveleliminar() {
    let contenedor = document.createElement('div');
    contenedor.className = "niveleliminar-container";

    let grande = document.createElement('div');
    grande.className = "niveleliminar-grande";

    let titulo = document.createElement('h1');
    titulo.textContent = "Eliminar Profesor";
    grande.appendChild(titulo); // antes estaba en contenedor

    let subtitulo = document.createElement('h2');
    subtitulo.textContent = "Seleccione el nivel del profesor a eliminar";
    grande.appendChild(subtitulo); // antes estaba en contenedor

    // Botones para los niveles
    const niveles = ["Pre-Primaria", "Primaria", "Básicos", "Diversificado"];
    
    niveles.forEach((nivel, index) => {
        let boton = document.createElement('button');
        boton.className = `nivel-boton boton-${index + 1}`;
        boton.textContent = nivel;

        boton.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarProfeEliminar', {
                detail: { nivelSeleccionado: nivel },
                bubbles: true
            });
            contenedor.dispatchEvent(evento);
        });

        grande.appendChild(boton);
    });

    // Botón de regresar
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

    contenedor.appendChild(grande);
    return contenedor;
}


export { niveleliminar };