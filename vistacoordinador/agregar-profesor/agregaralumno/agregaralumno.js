function agregaralumno({ nivel, grado }) {
    let contenedor = document.createElement('div');
    contenedor.className = "agregaralumno-container";

    let grande = document.createElement('div');
    grande.className = "agregaralumno-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = `Agregar profesor a ${grado}`;
    grande.appendChild(titulo);

    // Formulario
    let formulario = document.createElement('form');
    formulario.className = "formulario-agregar";

    // Campo Nombre
    let grupoNombre = document.createElement('div');
    grupoNombre.className = "form-group";
    
    let labelNombre = document.createElement('label');
    labelNombre.textContent = "Nombre del Profesor";
    labelNombre.htmlFor = "nombre";
    
    let inputNombre = document.createElement('input');
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.required = true;
    
    grupoNombre.appendChild(labelNombre);
    grupoNombre.appendChild(inputNombre);
    formulario.appendChild(grupoNombre);

    // Campo Contraseña
    let grupoContra = document.createElement('div');
    grupoContra.className = "form-group";
    
    let labelContra = document.createElement('label');
    labelContra.textContent = "Contraseña del Profesor";
    labelContra.htmlFor = "contrasena";
    
    let inputContra = document.createElement('input');
    inputContra.type = "password";
    inputContra.id = "contrasena";
    inputContra.required = true;
    
    grupoContra.appendChild(labelContra);
    grupoContra.appendChild(inputContra);
    formulario.appendChild(grupoContra);

    // Campo Correo
    let grupoCorreo = document.createElement('div');
    grupoCorreo.className = "form-group";
    
    let labelCorreo = document.createElement('label');
    labelCorreo.textContent = "Correo del Profesor";
    labelCorreo.htmlFor = "correo";
    
    let inputCorreo = document.createElement('input');
    inputCorreo.type = "email";
    inputCorreo.id = "correo";
    inputCorreo.required = true;
    
    grupoCorreo.appendChild(labelCorreo);
    grupoCorreo.appendChild(inputCorreo);
    formulario.appendChild(grupoCorreo);

    // Botones
    let grupoBotones = document.createElement('div');
    grupoBotones.className = "form-botones";
    
    let botonAgregar = document.createElement('button');
    botonAgregar.type = "submit";
    botonAgregar.className = "boton-agregar";
    botonAgregar.textContent = "Agregar";
    
    let botonRegresar = document.createElement('button');
    botonRegresar.type = "button";
    botonRegresar.className = "boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverGradoAgregar', {
            bubbles: true
        });
        contenedor.dispatchEvent(evento);
    });
    
    grupoBotones.appendChild(botonAgregar);
    grupoBotones.appendChild(botonRegresar);
    formulario.appendChild(grupoBotones);

    // Manejar envío del formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const profesor = {
            nombre: inputNombre.value,
            contrasena: inputContra.value,
            correo: inputCorreo.value,
            nivel,
            grado
        };
        
        console.log("Profesor a agregar:", profesor);
        alert(`Profesor ${profesor.nombre} agregado exitosamente a ${grado}`);
        
        // Aquí iría la llamada a la API para guardar el profesor
        // fetch('/api/profesores', { method: 'POST', body: JSON.stringify(profesor) })
    });

    grande.appendChild(formulario);

    return contenedor;
}

export { agregaralumno };