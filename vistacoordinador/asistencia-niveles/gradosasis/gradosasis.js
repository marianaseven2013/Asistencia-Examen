function gradosasis(nivelSeleccionado) {
    let contenedor = document.createElement('div');
    contenedor.className = "gradosasis-container";

    let grande = document.createElement('div');
    grande.className = "gradosasis-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = nivelSeleccionado;
    contenedor.appendChild(titulo);

    // Grados por nivel (datos de ejemplo)
    const gradosPorNivel = {
        "Pre-Primaria": ["Pre-Kinder", "Kinder", "Prepa"],
        "Primaria": ["1ro", "2do", "3ro", "4to", "5to", "6to"],
        "Básicos": ["1ro", "2do", "3ro"],
        "Diversificado": ["4to", "5to", "6to"]
    };

    const grados = gradosPorNivel[nivelSeleccionado] || [];

    grados.forEach((grado, index) => {
        let botonGrado = document.createElement('button');
        botonGrado.className = `grado-boton boton-${index + 1}`;
        botonGrado.textContent = grado;
        
        // Evento modificado para mostrar estadísticas
        botonGrado.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarViewEsta', {
                detail: {
                    nivel: nivelSeleccionado,
                    grado: grado
                },
                bubbles: true
            });
            contenedor.dispatchEvent(evento);
        });
        
        grande.appendChild(botonGrado);
    });

    // Botón de regresar
    let botonRegresar = document.createElement('button');
    botonRegresar.className = "grado-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverNivelesAsis', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { gradosasis };