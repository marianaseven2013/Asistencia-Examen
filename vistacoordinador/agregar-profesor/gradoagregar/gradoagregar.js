function gradoagregar(nivelSeleccionado) {
    let contenedor = document.createElement('div');
    contenedor.className = "gradoagregar-container";

    let grande = document.createElement('div');
    grande.className = "gradoagregar-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = nivelSeleccionado;
    contenedor.appendChild(titulo);

    // Grados por nivel (datos de ejemplo)
const gradosPorNivel = {
    "Pre-Primaria": ["Pre-Kinder", "Kinder", "Prepa"],
    "Primaria": ["1ro", "2do", "3ro", "4to", "5to", "6to"],
    "Básicos": ["1ro", "2do", "3ro"],
    "Diversificado": ["4to", "5to", "6to"] // Ajusta según tus necesidades
  };

    const grados = gradosPorNivel[nivelSeleccionado] || [];

    grados.forEach(grado => {
        let botonGrado = document.createElement('button');
        botonGrado.className = "grado-boton";
        botonGrado.textContent = grado;
        
        botonGrado.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarAgregarAlumno', {
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

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "grado-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverNivelAgregar', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { gradoagregar };