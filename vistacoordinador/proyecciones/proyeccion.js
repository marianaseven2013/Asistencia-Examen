function proyect() {
    let ccion = document.createElement('div');
    ccion.className = "proyeccioness"; 

    let grande = document.createElement('div');
    grande.className = "pro-garnde"; 
    ccion.appendChild(grande);

    let welcomme = document.createElement('h1');
    welcomme.textContent = "Bienvenida Coordinadora!"; 
    ccion.appendChild(welcomme);

    let adonde = document.createElement('h2');
    adonde.textContent = "A que proyección nos dirigiremos?"; 
    ccion.appendChild(adonde);

    let botonCerrarSesion = document.createElement('button');
    botonCerrarSesion.className = "bot-cerrar-sesion"; 
    botonCerrarSesion.textContent = "Cerrar Sesión";
    botonCerrarSesion.addEventListener('click', () => {
        console.log('Botón cerrar sesión clickeado'); // Para depuración
        const evento = new CustomEvent('cerrarSesion', {
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(evento);
    });
    ccion.appendChild(botonCerrarSesion);

    let boton1 = document.createElement('button');
    boton1.className = "bot1"; 
    boton1.textContent = "Asistencia de Estudiantes";
    boton1.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarAsistenciaEstudiantes');
        document.dispatchEvent(evento);
    });
    grande.appendChild(boton1);

    let boton2 = document.createElement('button');
    boton2.className = "bot2"; 
    boton2.textContent = "Asistencia de Profesores";
    boton2.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarAsistenciaProfesores');
        document.dispatchEvent(evento);
    });
    grande.appendChild(boton2);

    let boton3 = document.createElement('button');
    boton3.className = "bot3"; 
    boton3.textContent = "Agregar nuevos Profesores";
    boton3.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarAgregarProfesor');
        document.dispatchEvent(evento);
    });
    grande.appendChild(boton3);

    let boton4 = document.createElement('button');
    boton4.className = "bot4"; 
    boton4.textContent = "Eliminar Profesores";
    boton4.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarEliminarProfesor');
        document.dispatchEvent(evento);
    });
    grande.appendChild(boton4);

    let boton5 = document.createElement('button');
    boton5.className = "bot5"; 
    boton5.textContent = "Asistencia de los 4 niveles";
    boton5.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarAsistenciaNiveles');
        document.dispatchEvent(evento);
    });
    grande.appendChild(boton5);

    return ccion;
}

export { proyect };