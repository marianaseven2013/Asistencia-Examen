function agregaralumno({ nivel, grado }) {
    // 1. Mapeo exacto basado en tu BD (asegúrate que coincida exactamente)
    const mapNivelesBD = {
        "Pre-Primaria": "Pre-primaria",  // Exactamente como en tu BD
        "Primaria": "Primaria",
        "Básicos": "Básicos",
        "Diversificado": "Diversificado"
    };

    // 2. Mapeo de grados para mostrar nombres amigables pero enviar los correctos
    const mapGradosBD = {
        "Pre-Kinder": "prekinder",
        "Kinder": "kinder",
        "Prepa": "Preparatoria",
        "1ro": (nivel) => nivel === "Primaria" ? "1ro Primaria" : "1ro Básico",
        "2do": (nivel) => nivel === "Primaria" ? "2do Primaria" : "2do Básico",
        "3ro": (nivel) => nivel === "Primaria" ? "3ro Primaria" : "3ro Básico",
        "4to": (nivel) => nivel === "Primaria" ? "4to Primaria" : "4to Computación",
        "5to": (nivel) => nivel === "Primaria" ? "5to Primaria" : "5to Computación",
        "6to": (nivel) => nivel === "Primaria" ? "6to Primaria" : "6to Perito"
    };

    // 3. Función de conversión con validación
    const convertirDatosABD = (nivelFrontend, gradoFrontend) => {
        // Convertir nivel
        const nivelBD = mapNivelesBD[nivelFrontend];
        if (!nivelBD) {
            throw new Error(`Nivel '${nivelFrontend}' no está configurado`);
        }

        // Convertir grado
        let gradoBD;
        if (typeof mapGradosBD[gradoFrontend] === 'function') {
            gradoBD = mapGradosBD[gradoFrontend](nivelFrontend);
        } else {
            gradoBD = mapGradosBD[gradoFrontend] || gradoFrontend;
        }

        return { nivelBD, gradoBD };
    };

    let contenedor = document.createElement('div');
    contenedor.className = "agregaralumno-container";

    let grande = document.createElement('div');
    grande.className = "agregaralumno-grande";
    contenedor.appendChild(grande);

    let titulo = document.createElement('h1');
    titulo.textContent = `Agregar profesor a ${grado} ${nivel}`;
    grande.appendChild(titulo);

    // Formulario
    let formulario = document.createElement('form');
    formulario.className = "formulario-agregar";

    // Campo Nombre
    let grupoNombre = document.createElement('div');
    grupoNombre.className = "form-group";
    
    let labelNombre = document.createElement('label');
    labelNombre.textContent = "Nombre Completo del Profesor";
    labelNombre.htmlFor = "nombre";
    
    let inputNombre = document.createElement('input');
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.required = true;
    inputNombre.placeholder = "Ej: Juan Pérez";
    
    grupoNombre.appendChild(labelNombre);
    grupoNombre.appendChild(inputNombre);
    formulario.appendChild(grupoNombre);

    // Campo Correo
    let grupoCorreo = document.createElement('div');
    grupoCorreo.className = "form-group";
    
    let labelCorreo = document.createElement('label');
    labelCorreo.textContent = "Correo Electrónico";
    labelCorreo.htmlFor = "correo";
    
    let inputCorreo = document.createElement('input');
    inputCorreo.type = "email";
    inputCorreo.id = "correo";
    inputCorreo.required = true;
    inputCorreo.placeholder = "Ej: profesor@escuela.com";
    
    grupoCorreo.appendChild(labelCorreo);
    grupoCorreo.appendChild(inputCorreo);
    formulario.appendChild(grupoCorreo);

    // Campo Contraseña
    let grupoContra = document.createElement('div');
    grupoContra.className = "form-group";
    
    let labelContra = document.createElement('label');
    labelContra.textContent = "Contraseña Temporal";
    labelContra.htmlFor = "contrasena";
    
    let inputContra = document.createElement('input');
    inputContra.type = "password";
    inputContra.id = "contrasena";
    inputContra.required = true;
    inputContra.minLength = 6;
    inputContra.placeholder = "Mínimo 6 caracteres";
    
    grupoContra.appendChild(labelContra);
    grupoContra.appendChild(inputContra);
    formulario.appendChild(grupoContra);

    // Mensaje de estado
    let mensajeDiv = document.createElement('div');
    mensajeDiv.className = "mensaje-estado";
    formulario.appendChild(mensajeDiv);

    // Botones
    let grupoBotones = document.createElement('div');
    grupoBotones.className = "form-botones";
    
    let botonAgregar = document.createElement('button');
    botonAgregar.type = "submit";
    botonAgregar.className = "boton-agregar";
    botonAgregar.textContent = "Agregar Profesor";
    
    let botonRegresar = document.createElement('button');
    botonRegresar.type = "button";
    botonRegresar.className = "boton-regresar";
    botonRegresar.textContent = "Regresar";
    botonRegresar.addEventListener('click', () => {
        const evento = new CustomEvent('volverGradoAgregar', { bubbles: true });
        contenedor.dispatchEvent(evento);
    });
    
    grupoBotones.appendChild(botonAgregar);
    grupoBotones.appendChild(botonRegresar);
    formulario.appendChild(grupoBotones);

    // Manejar envío del formulario
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        botonAgregar.disabled = true;
        mensajeDiv.textContent = "Procesando...";
        mensajeDiv.style.color = "blue";

        try {
            // Conversión segura de datos
            const { nivelBD, gradoBD } = convertirDatosABD(nivel, grado);

            const profesor = {
                nombre: inputNombre.value.trim(),
                contrasena: inputContra.value,
                correo: inputCorreo.value.trim(),
                nivel: nivelBD,
                grado: gradoBD
            };

            console.log("Datos a enviar a la BD:", profesor);

            const respuesta = await fetch('http://localhost:3000/agregar-profesor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profesor)
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.error || resultado.message || "Error al agregar profesor");
            }

            mensajeDiv.textContent = "✅ " + resultado.mensaje;
            mensajeDiv.style.color = "green";
            
            // Limpiar formulario
            inputNombre.value = "";
            inputCorreo.value = "";
            inputContra.value = "";
            
            // Regresar después de 2 segundos
            setTimeout(() => {
                const evento = new CustomEvent('volverGradoAgregar', { bubbles: true });
                contenedor.dispatchEvent(evento);
            }, 2000);

        } catch (error) {
            console.error('Error al agregar profesor:', error);
            mensajeDiv.textContent = "❌ " + error.message;
            mensajeDiv.style.color = "red";
        } finally {
            botonAgregar.disabled = false;
        }
    });

    grande.appendChild(formulario);
    return contenedor;
}

export { agregaralumno };