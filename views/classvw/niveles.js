function niveles() {
    let contenedor = document.createElement('div');
    contenedor.className = "niveles";

    let cuadroNivel = document.createElement('div');
    cuadroNivel.className = "cuadro-nivel";
    
    let titulo = document.createElement('h1');
    titulo.className = "welcomen";
    titulo.textContent = "Asistencia de Estudiantes";
    cuadroNivel.appendChild(titulo);
    contenedor.appendChild(cuadroNivel);

    let btnEstadisticas = document.createElement('button');
    btnEstadisticas.className = "distica";
    btnEstadisticas.textContent = "Ver Estadísticas Generales";
    btnEstadisticas.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarEstadisticasGenerales');
        contenedor.dispatchEvent(evento);
    });
    contenedor.appendChild(btnEstadisticas);

        const niveles = ["Pre-Primaria", "Primaria", "Básicos", "Diversificado"];
    
    niveles.forEach(nivel => {
        let boton = document.createElement('button');
        boton.className = "curso-btn";
        boton.textContent = nivel;
        
        boton.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarAsistenciaGrado', {
                detail: { nivelSeleccionado: nivel },
                bubbles: true
            });
            contenedor.dispatchEvent(evento);
        });
        
        contenedor.appendChild(boton);
    });

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "curso-btn cerrar-sesion";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverProyeccion', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    contenedor.appendChild(botonRegresar);

    return contenedor;
}

export { niveles };