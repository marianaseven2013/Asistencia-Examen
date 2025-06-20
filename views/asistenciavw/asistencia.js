import { crearVentanaUniforme } from '../../ventanas/uniforme/unforme.js';
import { crearVentanaRedactarCorreo } from '../../ventanas/redactarcorreo/redacorreo.js';
import { crearVentanaEliminar } from '../../ventanas/eliminaralumno/eliminaralumno.js';
import { crearVentanaCorreoAlumno } from '../../ventanas/correoalumno/correoalumno.js';
import { crearVentanaAgregarAlumno } from '../../ventanas/agregaralumno/agregaralumno.js';
import { calnd } from '../../calendario/calendario/calendario.js';

function cambiarVista(nuevaVista) {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = '';
        root.appendChild(nuevaVista);
    }
}

export function asiscuadro({ gradoId, nombreGrado }) {
    const container = document.createElement('div');
    container.className = 'asistencia-container asistencia-coordinador';

    const grande = document.createElement('div');
    grande.className = 'asistencia-grande';
    container.appendChild(grande);

    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    const logoImg = document.createElement('img');
    logoImg.src = './services/img/logosg.png';
    logoImg.alt = 'Logo SG';
    logoImg.className = 'logosg-img';

    const title = document.createElement('h1');
    title.textContent = nombreGrado || 'Asistencia';

    titleContainer.appendChild(logoImg);
    titleContainer.appendChild(title);
    grande.appendChild(titleContainer);

    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    const leftHeader = document.createElement('div');
    leftHeader.className = 'left-header';

    const emailHeaderBtn = document.createElement('button');
    emailHeaderBtn.className = 'email-header-btn';
    const emailIcon = document.createElement('img');
    emailIcon.src = './services/img/iconoemail.png';
    emailIcon.alt = 'Email';
    emailHeaderBtn.appendChild(emailIcon);

    const headerTitle = document.createElement('h2');
    headerTitle.className = 'header-title';
    headerTitle.textContent = 'Lista de Estudiantes';

    leftHeader.appendChild(emailHeaderBtn);
    leftHeader.appendChild(headerTitle);

    const forAllBtn = document.createElement('button');
    forAllBtn.className = 'for-all-btn';
    forAllBtn.textContent = 'Marcar Todos';

    headerContainer.appendChild(leftHeader);
    headerContainer.appendChild(forAllBtn);
    grande.appendChild(headerContainer);

    const alumnosContainer = document.createElement('div');
    alumnosContainer.className = 'alumnos-container';

    let alumnos = [];
    fetch('http://localhost:3000/obtenerAlumnosPorGrado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grado_id: gradoId })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.alumnos) {
            throw new Error("Respuesta no contiene alumnos");
        }
    
        alumnos = data.alumnos.map(alumno => ({
            ...alumno,
            uniforme: false,
            estado: 0
        }));
        renderAlumnos();
    })
    .catch(error => {
        console.error('Error al cargar alumnos:', error);
    });
    

    const coloresEstado = ['#ffffff', '#4CAF50', '#FF9800', '#F44336'];

    function renderAlumnos() {
        alumnosContainer.innerHTML = '';
        alumnos.forEach((alumno, index) => {
            const alumnoDiv = document.createElement('div');
            alumnoDiv.className = 'alumno-item';

            const nombreWrapper = document.createElement('div');
            nombreWrapper.className = 'nombre-wrapper';

            const nombre = document.createElement('h3');
            nombre.textContent = alumno.nombre;
            nombreWrapper.appendChild(nombre);

            const formularioBtn = document.createElement('button');
            formularioBtn.className = 'formulario-btn';
            formularioBtn.textContent = 'Ir a Formulario';
            formularioBtn.addEventListener('click', () => {
                const calendario = calnd(alumno.nombre);
                calendario.addEventListener('volverAsistencia', () => {
                    cambiarVista(container);
                });
                cambiarVista(calendario);
            });
            nombreWrapper.appendChild(formularioBtn);

            const accionesContainer = document.createElement('div');
            accionesContainer.className = 'acciones-container';

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

            const accionesCorreo = document.createElement('div');
            accionesCorreo.className = 'acciones-correo';

            const emailBtn = document.createElement('button');
            emailBtn.className = 'email-btn';
            const emailBtnIcon = document.createElement('img');
            emailBtnIcon.src = './services/img/iconoemail.png';
            emailBtnIcon.alt = 'Email';
            emailBtn.appendChild(emailBtnIcon);
            emailBtn.addEventListener('click', () => {
                const modal = crearVentanaCorreoAlumno(alumno.nombre);
                document.body.appendChild(modal);
            });

            const uniformeBtn = document.createElement('button');
            uniformeBtn.className = 'uniforme-btn';
            const shirtIcon = document.createElement('img');
            shirtIcon.src = './services/img/iconouni.png';
            shirtIcon.alt = 'Uniforme';
            shirtIcon.style.filter = alumno.uniforme ? 'none' : 'grayscale(100%) opacity(0.5)';
            uniformeBtn.appendChild(shirtIcon);

            uniformeBtn.addEventListener('click', () => {
                alumno.uniforme = !alumno.uniforme;
                shirtIcon.style.opacity = alumno.uniforme ? '1' : '0.5';
                
                const modal = crearVentanaUniforme(alumno);     // <–– ahora recibe el objeto completo
                document.body.appendChild(modal);
              });
            
            accionesCorreo.appendChild(emailBtn);
            accionesCorreo.appendChild(uniformeBtn);
            nombreWrapper.appendChild(accionesCorreo);

            alumnoDiv.appendChild(nombreWrapper);

            const correoWrapper = document.createElement('div');
            correoWrapper.className = 'correo-wrapper';

            const correo = document.createElement('p');
            correo.innerHTML = `<a href="mailto:${alumno.correo}">${alumno.correo}</a>`;
            correoWrapper.appendChild(correo);

            alumnoDiv.appendChild(correoWrapper);

            alumnosContainer.appendChild(alumnoDiv);
        });
    }

    grande.appendChild(alumnosContainer);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Declaración y uso correcto de addButton
    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar Alumno';
    addButton.addEventListener('click', () => {
        const modal = crearVentanaAgregarAlumno();
        document.body.appendChild(modal);

        const usuario_id = localStorage.getItem('usuario_id');

        modal.addEventListener('nuevoAlumno', (e) => {
            const nuevo = e.detail;

            fetch('http://localhost:3000/agregarAlumno', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: nuevo.nombre,
                    correo: nuevo.correo,
                    grado_id: gradoId,
                    usuario_id: parseInt(usuario_id)
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alumnos.push({
                        nombre: nuevo.nombre,
                        correo: nuevo.correo,
                        uniforme: false,
                        estado: 0
                    });
                    renderAlumnos();
                } else {
                    alert('Error al guardar el alumno');
                }
            })
            .catch(err => {
                console.error('Error al guardar alumno:', err);
            });
        });
    });
    buttonsContainer.appendChild(addButton);

    const backButton = document.createElement('button');
    backButton.className = "curso-btn";
    backButton.textContent = "Regresar";
    backButton.addEventListener('click', () => {
        const eventoRegreso = new CustomEvent('volverNiveles', { bubbles: true });
        container.dispatchEvent(eventoRegreso);
    });
    buttonsContainer.appendChild(backButton);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.className = 'primary';
    saveButton.addEventListener('click', () => {
        const asistencias = alumnos.map(al => ({
          alumnos_id: al.id,
          grados_id: gradoId,
          estado: ['NO vino','Vino','Tarde'][al.estado] || 'NO vino',
          uniforme_id: al.uniforme_id || null   // ahora sí trae valor
        }));
      
        fetch('http://localhost:3000/guardarAsistencias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ asistencias })
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) alert('Asistencia guardada correctamente');
          else       alert('Error al guardar asistencia');
        })
        .catch(err => {
          console.error('Error al guardar asistencia:', err);
          alert('Error en el servidor');
        });
      });
      

    buttonsContainer.appendChild(saveButton);

    grande.appendChild(buttonsContainer);

    emailHeaderBtn.addEventListener('click', () => {
        const modal = crearVentanaRedactarCorreo();
        document.body.appendChild(modal);
    });

    forAllBtn.addEventListener('click', () => {
        alumnos.forEach(alumno => { alumno.estado = 1; });
        renderAlumnos();
    });

    return container;
}