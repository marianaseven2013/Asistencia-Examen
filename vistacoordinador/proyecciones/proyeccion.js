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
    adonde.textContent = "A que proyeccion nos dirigiremos?"; 
    ccion.appendChild(adonde);

    let boton1 = document.createElement('button');
    boton1.className = "bot1"; 
    boton1.textContent = "Asistencia de Estudiantes";
    grande.appendChild(boton1);

    let boton2 = document.createElement('button');
    boton2.className = "bot2"; 
    boton2.textContent = "Asistencia de Profesores";
    grande.appendChild(boton2);

    // Dentro de la función proyect(), modifica el botón 3:
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

    // Dentro de la función proyect(), modifica el botón 5:
    let boton5 = document.createElement('button');
    boton5.className = "bot5"; 
    boton5.textContent = "Asistencia de los 4 niveles";
    boton5.addEventListener('click', () => {
    const evento = new CustomEvent('mostrarAsistenciaNiveles');
    document.dispatchEvent(evento);
    });
    grande.appendChild(boton5);

    // Evento para el botón "Asistencia de Profesores"
    boton2.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarAsistenciaProfesores');
        document.dispatchEvent(evento);
    });

    // Evento para el botón "Eliminar Profesores" (NUEVO)
    boton4.addEventListener('click', () => {
        const evento = new CustomEvent('mostrarEliminarProfesor');
        document.dispatchEvent(evento);
    });

    return ccion;
}

export { proyect };