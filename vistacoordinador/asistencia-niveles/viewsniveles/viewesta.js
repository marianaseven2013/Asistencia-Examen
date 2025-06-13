function viewesta({ nivel, grado }) {
    let contenedor = document.createElement('div');
    contenedor.className = "viewesta-container";

    let grande = document.createElement('div');
    grande.className = "viewesta-grande";
    contenedor.appendChild(grande);

    // Título con el grado (ej: "V COMPUTACION")
    let titulo = document.createElement('h1');
    titulo.textContent = `${grado} ${nivel}`.toUpperCase();
    grande.appendChild(titulo);

    // Contenedor para las estadísticas
    let estadisticas = document.createElement('div');
    estadisticas.className = "estadisticas-container";

    // Datos de ejemplo - estudiantes con sus porcentajes
    const estudiantes = [
        { nombre: "María González", porcentaje: "65%" },
        { nombre: "Juan Pérez", porcentaje: "72%" },
        { nombre: "Ana Martínez", porcentaje: "88%" },
        { nombre: "Carlos López", porcentaje: "65%" },
        { nombre: "Sofía Ramírez", porcentaje: "91%" },
        { nombre: "Luis Hernández", porcentaje: "65%" },
        { nombre: "Laura Díaz", porcentaje: "78%" },
        { nombre: "Pedro Sánchez", porcentaje: "65%" },
        { nombre: "Elena Castro", porcentaje: "83%" },
        { nombre: "Jorge Ruiz", porcentaje: "65%" }
    ];

    estudiantes.forEach(estudiante => {
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

    grande.appendChild(estadisticas);

    // Botón de regresar
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