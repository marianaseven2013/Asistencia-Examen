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

    fetch('http://localhost:3000/profesoresPorNivel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nivel: nivelSeleccionado })
    })
    .then(res => res.json())
    .then(profesores => {
        profesores.forEach((profesor, index) => {
            let grupo = document.createElement('div');
            grupo.className = "grupo-profesor";
    
            let gradoProfesor = document.createElement('p');
            gradoProfesor.className = "grado-profesor";
            gradoProfesor.textContent = profesor.grado_nombre;
            grupo.appendChild(gradoProfesor);
    
            let nombreProfesor = document.createElement('p');
            nombreProfesor.className = "nombre-profesor";
            nombreProfesor.textContent = profesor.profesor_nombre || 'Sin nombre';
            grupo.appendChild(nombreProfesor);
    
            let botonEliminar = document.createElement('button');
            botonEliminar.className = `eliminar-boton boton-${index + 1}`;
            botonEliminar.textContent = "Eliminar";
    
            botonEliminar.addEventListener('click', () => {
                const modal = crearVentanaEliminar(profesor); // <-- aquí se envía el objeto profesor entero
                document.body.appendChild(modal);
    
                modal.addEventListener('confirmarEliminacion', () => {
                    const correoCoordinador = localStorage.getItem('correo');
                    const contrasena = modal.querySelector('input[type="password"]').value;
    
                    fetch('http://localhost:3000/eliminarProfesor', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            correoCoordinador,
                            contrasena,
                            idProfesor: profesor.profesor_id
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        alert(data.mensaje);
                        modal.remove();
                        grupo.remove();
                    })
                    .catch(err => {
                        alert('Error al eliminar');
                        console.error(err);
                    });
                });
    
                modal.addEventListener('cancelarEliminacion', () => {
                    modal.remove();
                });
            });
    
            grupo.appendChild(botonEliminar);
            grande.appendChild(grupo);
        });
    });
    

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "eliminar-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverNivelEliminar', { bubbles: true });
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}

export { profeeliminar };
