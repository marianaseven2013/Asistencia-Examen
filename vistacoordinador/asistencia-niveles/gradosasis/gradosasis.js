async function gradosasis(nivelSeleccionado, correo) {
    let contenedor = document.createElement('div');
    contenedor.className = "gradosasis-container";

    let grande = document.createElement('div');
    grande.className = "gradosasis-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = nivelSeleccionado;
    contenedor.appendChild(titulo);

    try {
        const grados = [
            { grado: 'Primero A' },
            { grado: 'Segundo B' }
            // Puedes reemplazar esto con otros datos que tengas disponibles
        ];
        



        if (grados.length === 0) {
            let mensaje = document.createElement('p');
            mensaje.textContent = "No tienes grados asignados para este nivel.";
            contenedor.appendChild(mensaje);
        }

        grados.forEach((grado, index) => {
            let botonGrado = document.createElement('button');
            botonGrado.className = `grado-boton boton-${index + 1}`;
            botonGrado.textContent = grado.grado;

            botonGrado.addEventListener('click', () => {
                const evento = new CustomEvent('mostrarViewEsta', {
                    detail: {
                        nivel: nivelSeleccionado,
                        grado: grado.grado
                    },
                    bubbles: true
                });
                contenedor.dispatchEvent(evento);
            });

            grande.appendChild(botonGrado);
        });

    } catch (error) {
        console.error('Error al obtener grados:', error);
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No se pudieron cargar los grados.';
        contenedor.appendChild(mensaje);
    }

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
