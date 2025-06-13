function gradoprofe(nivelSeleccionado) {
    let contenedor = document.createElement('div');
    contenedor.className = "gradoprofe-container";

    let grande = document.createElement('div');
    grande.className = "gradoprofe-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = nivelSeleccionado;
    contenedor.appendChild(titulo);

    // Datos de ejemplo
    const profesores = [
        { grado: "Pre-Kinder", nombre: "NombreProfessor" },
        { grado: "Kinder", nombre: "NombreProfessor" },
        { grado: "Prepa", nombre: "NombreProfessor" }
    ];

    profesores.forEach((profesor, index) => {
        let grupo = document.createElement('div');
        grupo.className = "grupo-grado";

        let botonGrado = document.createElement('button');
        botonGrado.className = `grado-boton boton-${index + 1}`;
        botonGrado.textContent = profesor.grado;
        
        // Evento para mostrar proyección semanal
        // Dentro del event listener de los botones de grado:
        botonGrado.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarProyeccionEst', {
        detail: {
        profesor: profesor.nombre,  // "Nombre Completo del Profesor"
            grado: profesor.grado      // "Pre-Kinder", "Kinder", etc.
        }
    });
    document.dispatchEvent(evento);
});
        
        grupo.appendChild(botonGrado);

        let nombreProfesor = document.createElement('p');
        nombreProfesor.className = "nombre-profesor";
        nombreProfesor.textContent = profesor.nombre;
        grupo.appendChild(nombreProfesor);

        grande.appendChild(grupo);
    });

    // Botón de regresar
    let botonRegresar = document.createElement('button');
    botonRegresar.className = "grado-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverNivelProfe');
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { gradoprofe };