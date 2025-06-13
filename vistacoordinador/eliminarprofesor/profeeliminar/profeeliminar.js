import { crearVentanaEliminar } from '../vieweliminar/veliminar.js';

function profeeliminar(nivelSeleccionado) {
    let contenedor = document.createElement('div');
    contenedor.className = "profeeliminar-container";

    let grande = document.createElement('div');
    grande.className = "profeeliminar-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = `Eliminar Profesor - ${nivelSeleccionado}`;
    contenedor.appendChild(titulo);

    // Datos de ejemplo de profesores
    const profesores = [
        { nombre: "NombreProfesor", grado: "Pre-Kinder" },
        { nombre: "NombreProfesor", grado: "Prepa" }
    ];

    profesores.forEach((profesor, index) => {
        let grupo = document.createElement('div');
        grupo.className = "grupo-profesor";

        let gradoProfesor = document.createElement('p');
        gradoProfesor.className = "grado-profesor";
        gradoProfesor.textContent = profesor.grado;
        grupo.appendChild(gradoProfesor);

        let nombreProfesor = document.createElement('p');
        nombreProfesor.className = "nombre-profesor";
        nombreProfesor.textContent = profesor.nombre;
        grupo.appendChild(nombreProfesor);

        let botonEliminar = document.createElement('button');
        botonEliminar.className = `eliminar-boton boton-${index + 1}`;
        botonEliminar.textContent = "Eliminar";
        
        botonEliminar.addEventListener('click', () => {
            // Mostrar ventana de confirmación
            const modal = crearVentanaEliminar(profesor);
            document.body.appendChild(modal);
            
            // Manejar el evento de confirmación
            modal.addEventListener('confirmarEliminacion', () => {
                // Lógica para eliminar al profesor
                console.log(`Eliminando a ${profesor.nombre} de ${profesor.grado}`);
                modal.remove();
            });
            
            // Manejar el evento de cancelación
            modal.addEventListener('cancelarEliminacion', () => {
                modal.remove();
            });
        });
        
        grupo.appendChild(botonEliminar);
        grande.appendChild(grupo);
    });

    // Botón de regresar
    let botonRegresar = document.createElement('button');
    botonRegresar.className = "eliminar-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverNivelEliminar', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { profeeliminar };