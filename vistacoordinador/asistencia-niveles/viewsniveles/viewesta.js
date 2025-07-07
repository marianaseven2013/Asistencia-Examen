async function viewesta({ nivel, grado }) {
    let contenedor = document.createElement('div');
    contenedor.className = "viewesta-container";

    let grande = document.createElement('div');
    grande.className = "viewesta-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = `${grado} ${nivel}`.toUpperCase();
    grande.appendChild(titulo);

    let estadisticas = document.createElement('div');
    estadisticas.className = "estadisticas-container";

    try {
        const res = await fetch('http://localhost:3000/asistenciaPorcentajesSemana', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nivel, grado })
        });
        const data = await res.json();

        if (data.ok) {
            data.resumen.forEach(estudiante => {
                let item = document.createElement('div');
                item.className = "estadistica-item";
                
                let nombre = document.createElement('p');
                nombre.className = "nombre-estudiante";
                nombre.textContent = estudiante.nombre;
                
                let porcentaje = document.createElement('p');
                porcentaje.className = "porcentaje";
                porcentaje.textContent = estudiante.porcentaje;
                
                item.appendChild(nombre);
                item.appendChild(porcentaje);
                estadisticas.appendChild(item);
            });
        } else {
            estadisticas.textContent = "No se pudieron obtener los datos.";
        }
    } catch (err) {
        console.error("❌ Error al cargar los porcentajes:", err);
        estadisticas.textContent = "Ocurrió un error al cargar los datos.";
    }

    grande.appendChild(estadisticas);

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "viewesta-boton boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverGradosAsis', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    grande.appendChild(botonRegresar);

    return contenedor;
}


export { viewesta };