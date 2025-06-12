// Importaciones de todas las ventanas modales
import { crearVentanaUniforme } from '../../ventanas/uniforme/unforme.js';
import { crearVentanaRedactarCorreo } from '../../ventanas/redactarcorreo/redacorreo.js';
import { crearVentanaEliminar } from '../../ventanas/eliminaralumno/eliminaralumno.js';
import { crearVentanaCorreoAlumno } from '../../ventanas/correoalumno/correoalumno.js';
import { crearVentanaAgregarAlumno } from '../../ventanas/agregaralumno/agregaralumno.js';
import { calnd } from '../../calendario/calendario/calendario.js';

export function asiscuadro() {
    const container = document.createElement('div');
    container.className = 'asistencia-container';

    // Título principal
    const title = document.createElement('h1');
    title.textContent = 'IV COMPUTACIÓN';
    container.appendChild(title);

    // Header con botones
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    // Botón de email (header)
    const emailBtnContainer = document.createElement('div');
    emailBtnContainer.className = 'header-buttons';

    const emailHeaderBtn = document.createElement('button');
    emailHeaderBtn.className = 'email-header-btn';
    const emailIcon = document.createElement('img');
    emailIcon.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23000000"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
    emailIcon.alt = 'Email';
    emailHeaderBtn.appendChild(emailIcon);

    emailBtnContainer.appendChild(emailHeaderBtn);

    // Título "Para todos"
    const headerTitle = document.createElement('h2');
    headerTitle.className = 'header-title';
    headerTitle.textContent = 'Para todos';

    // Botón "Marcar Todos"
    const forAllBtn = document.createElement('button');
    forAllBtn.className = 'for-all-btn';
    forAllBtn.textContent = 'Marcar Todos';

    headerContainer.appendChild(emailBtnContainer);
    headerContainer.appendChild(headerTitle);
    headerContainer.appendChild(forAllBtn);
    container.appendChild(headerContainer);

    // Contenedor de alumnos
    const alumnosContainer = document.createElement('div');
    alumnosContainer.className = 'alumnos-container';

    // Datos de ejemplo
    let alumnos = [
        { nombre: 'Sofia Adali Garcia Perez', correo: 'correo1@scl.edu.gt', uniforme: false, estado: 0 },
        { nombre: 'Nombre Completo 2', correo: 'correo2@scl.edu.gt', uniforme: true, estado: 1 }
    ];

    const coloresEstado = ['#ffffff', '#4CAF50', '#FF9800', '#F44336']; // Blanco, Verde, Naranja, Rojo

    // Función para renderizar alumnos
    function renderAlumnos() {
        alumnosContainer.innerHTML = '';
        
        alumnos.forEach((alumno, index) => {
            const alumnoDiv = document.createElement('div');
            alumnoDiv.className = 'alumno-item';

            // Contenedor nombre y acciones
            const nombreWrapper = document.createElement('div');
            nombreWrapper.className = 'nombre-wrapper';

            const nombre = document.createElement('h3');
            nombre.textContent = alumno.nombre;
            nombreWrapper.appendChild(nombre);

            // Botón "Ir a Formulario" (MODIFICACIÓN CLAVE)
            const formularioBtn = document.createElement('button');
            formularioBtn.className = 'formulario-btn';
            formularioBtn.textContent = 'Ir a Formulario';
            formularioBtn.addEventListener('click', () => {
            const root = document.getElementById('root'); // Usamos #root en lugar de .main-container
             if (root) {
            root.innerHTML = '';
            root.appendChild(calnd()); // Carga el calendario
             }
            });
            nombreWrapper.appendChild(formularioBtn);

            // ... (Resto del código original, sin cambios)
            // Acciones (eliminar y estado)
            const accionesContainer = document.createElement('div');
            accionesContainer.className = 'acciones-container';

            // Botón eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            const trashIcon = document.createElement('img');
            trashIcon.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff0000"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';
            trashIcon.alt = 'Eliminar';
            deleteBtn.appendChild(trashIcon);
            
            deleteBtn.addEventListener('click', () => {
                const modal = crearVentanaEliminar(alumno.nombre);
                document.body.appendChild(modal);
                
                modal.addEventListener('confirmacion', (e) => {
                    if (e.detail.confirmado) {
                        alumnos = alumnos.filter((_, i) => i !== index);
                        renderAlumnos();
                    }
                });
            });

            // Botón estado
            const estadoBtn = document.createElement('button');
            estadoBtn.className = 'estado-btn';
            estadoBtn.style.backgroundColor = coloresEstado[alumno.estado];
            estadoBtn.addEventListener('click', () => {
                alumno.estado = (alumno.estado + 1) % coloresEstado.length;
                estadoBtn.style.backgroundColor = coloresEstado[alumno.estado];
            });

            accionesContainer.appendChild(deleteBtn);
            accionesContainer.appendChild(estadoBtn);
            nombreWrapper.appendChild(accionesContainer);
            alumnoDiv.appendChild(nombreWrapper);

            // Contenedor correo y acciones
            const correoWrapper = document.createElement('div');
            correoWrapper.className = 'correo-wrapper';

            // Correo electrónico
            const correo = document.createElement('p');
            correo.innerHTML = `<a href="mailto:${alumno.correo}">${alumno.correo}</a>`;
            correoWrapper.appendChild(correo);

            // Acciones correo (email y uniforme)
            const accionesCorreo = document.createElement('div');
            accionesCorreo.className = 'acciones-correo';

            // Botón email individual
            const emailBtn = document.createElement('button');
            emailBtn.className = 'email-btn';
            const emailBtnIcon = document.createElement('img');
            emailBtnIcon.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23000000"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
            emailBtnIcon.alt = 'Email';
            emailBtn.appendChild(emailBtnIcon);
            
            emailBtn.addEventListener('click', () => {
                const modal = crearVentanaCorreoAlumno(alumno.nombre);
                document.body.appendChild(modal);
            });

            // Botón uniforme
            const uniformeBtn = document.createElement('button');
            uniformeBtn.className = 'uniforme-btn';
            const shirtIcon = document.createElement('img');
            shirtIcon.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230066cc"><path d="M16 6v-2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2h-5v4c0 1.1.9 2 2 2h2v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-8h2c1.1 0 2-.9 2-2v-4h-5zm-6-2h4v2h-4v-2zm6 16h-4v-6h4v6z"/></svg>';
            shirtIcon.alt = 'Uniforme';
            shirtIcon.style.filter = alumno.uniforme ? 'none' : 'grayscale(100%) opacity(0.5)';
            uniformeBtn.appendChild(shirtIcon);
            
            uniformeBtn.addEventListener('click', () => {
                alumno.uniforme = !alumno.uniforme;
                shirtIcon.style.filter = alumno.uniforme ? 'none' : 'grayscale(100%) opacity(0.5)';
                const modal = crearVentanaUniforme();
                document.body.appendChild(modal);
            });

            accionesCorreo.appendChild(emailBtn);
            accionesCorreo.appendChild(uniformeBtn);
            correoWrapper.appendChild(accionesCorreo);
            alumnoDiv.appendChild(correoWrapper);

            alumnosContainer.appendChild(alumnoDiv);
        });
    }

    renderAlumnos();
    container.appendChild(alumnosContainer);

    // Botones inferiores
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Botón Agregar Alumno
    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar Alumno';
    addButton.addEventListener('click', () => {
        const modal = crearVentanaAgregarAlumno();
        document.body.appendChild(modal);
        
        modal.addEventListener('nuevoAlumno', (e) => {
            alumnos.push(e.detail);
            renderAlumnos();
        });
    });
    buttonsContainer.appendChild(addButton);

    // Botón Regresar
    const backButton = document.createElement('button');
    backButton.textContent = 'Regresar';
    buttonsContainer.appendChild(backButton);

    // Botón Guardar
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.className = 'primary';
    buttonsContainer.appendChild(saveButton);

    container.appendChild(buttonsContainer);

    // Evento para el botón de email en el header
    emailHeaderBtn.addEventListener('click', () => {
        const modal = crearVentanaRedactarCorreo();
        document.body.appendChild(modal);
    });

    // Evento para el botón "Marcar Todos"
    forAllBtn.addEventListener('click', () => {
        alumnos.forEach(alumno => {
            alumno.estado = 1; // Marcar todos como presentes (verde)
        });
        renderAlumnos();
    });

    return container;
}