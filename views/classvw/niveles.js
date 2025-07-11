
function niveles(grados, nivel) {
    let contenedor = document.createElement('div');
    contenedor.className = "niveles";

    let cuadroNivel = document.createElement('div');
    cuadroNivel.className = "cuadro-nivel";

    
    let titulo = document.createElement('h1');
    titulo.className = "welcomen";
    titulo.textContent = `Bienvenido a: ${nivel}`;
    contenedor.appendChild(titulo);
    cuadroNivel.appendChild(titulo);
    contenedor.appendChild(cuadroNivel);

    let btnEstadisticas = document.createElement('button');
    btnEstadisticas.className = "distica";
    btnEstadisticas.textContent = "Ver Estadísticas Generales";
    btnEstadisticas.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarEstadisticasGenerales', {
            detail: { grados, nivel },
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    
    
    contenedor.appendChild(btnEstadisticas);

    // Aquí se crean los botones según los grados recibidos
    grados.forEach(grado => {
        let boton = document.createElement('button');
        boton.className = "curso-btn";
        boton.textContent = grado.grado;

        boton.addEventListener('click', () => {
            const evento = new CustomEvent('mostrarAsistenciaGrado', {
                detail: { gradoSeleccionado: grado },
                bubbles: true
            });
            contenedor.dispatchEvent(evento);
        });

        contenedor.appendChild(boton);
    });

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "curso-btn cerrar-sesion";
    botonRegresar.textContent = "Salir";
    botonRegresar.addEventListener('click', () => {
    const evento = new CustomEvent('cerrarSesion', {
        bubbles: true
    });
    contenedor.dispatchEvent(evento);
});
contenedor.appendChild(botonRegresar);


    return contenedor;
}

export { niveles };
