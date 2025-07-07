function gradoprofe(nivelSeleccionado, profesores) {
    let contenedor = document.createElement('div');
    contenedor.className = "gradoprofe-container";

    let grande = document.createElement('div');
    grande.className = "gradoprofe-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = nivelSeleccionado;
    contenedor.appendChild(titulo);

    profesores.forEach((profesor, index) => {
        let grupo = document.createElement('div');
        grupo.className = "grupo-grado";

        let botonGrado = document.createElement('button');
        botonGrado.className = `grado-boton boton-${index + 1}`;
        botonGrado.textContent = profesor.grado_nombre;

        if (profesor.profesor_id) {
            botonGrado.addEventListener('click', () => {
                const evento = new CustomEvent('mostrarProyeccionEst', {
                    detail: {
                        profesor: profesor.profesor_nombre,
                        profesorId: profesor.profesor_id,
                        grado: profesor.grado_nombre,
                        gradoId: profesor.grado_id,
                        nivelSeleccionado: nivelSeleccionado
                    }
                });
                document.dispatchEvent(evento);
            });
        } else {
            botonGrado.disabled = true;
            botonGrado.title = 'Sin profesor asignado';
        }

        grupo.appendChild(botonGrado);

        let nombreProfesor = document.createElement('p');
        nombreProfesor.className = "nombre-profesor";
        nombreProfesor.textContent = profesor.profesor_nombre || 'Sin profesor asignado';
        grupo.appendChild(nombreProfesor);

        grande.appendChild(grupo);
    });

    // ✅ Botón para regresar a nivelprofe
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



