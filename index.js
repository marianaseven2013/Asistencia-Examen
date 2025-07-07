import { h_login } from './views/loginvw/login.js';
import { niveles } from './views/classvw/niveles.js';
import { asiscuadro } from './views/asistenciavw/asistencia.js';
import { estg } from './estadisticas/generalest/estgeneral.js';
import { individual } from './estadisticas/individualest/individual.js';
import { proyect } from './vistacoordinador/proyecciones/proyeccion.js';
import { gradoprofe } from './vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.js';
import { proyeccionest } from './vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.js';


const root = document.getElementById('root');
let currentView = null;
let proyeccionDiv = null;
let cerrarSesionHandler = null;

function mostrarVista(vista) {
    if (!(vista instanceof Node)) {
        console.error('Intento de mostrar una vista que no es un nodo válido:', vista);
        return; // O puedes crear un elemento de error por defecto
    }
    
    // Limpiar el contenedor actual de manera segura
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    
    // Agregar la nueva vista
    root.appendChild(vista);
    currentView = vista;
}

async function cargarCSS(url) {
    if (!document.querySelector(`link[href*="${url}"]`)) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = url;
        document.head.appendChild(css);
    }
}


function handleLogin(email, rol) {
    
    if (cerrarSesionHandler) {
        document.removeEventListener('cerrarSesion', cerrarSesionHandler);
    }

    const continuarConVista = (vista, cssPath) => {
        cerrarSesionHandler = () => {
            console.log('Cerrando sesión...');
            mostrarVista(h_login(handleLogin));
        };
        document.addEventListener('cerrarSesion', cerrarSesionHandler);

        configurarManejadoresEventos();
        cargarCSS(cssPath);
        mostrarVista(vista);
    };

    if (rol === 'coordinador') {
        const vistaCoordinador = proyect();
        proyeccionDiv = vistaCoordinador; // ✅ Asegura que esté disponible para regresar
        continuarConVista(vistaCoordinador, './vistacoordinador/proyecciones/proyeccion.css');
    }
     else if (rol === 'profesor') {

        // Llama al backend para obtener los grados y el nivel del profesor
        fetch('http://localhost:3000/obtenerGradosProfesor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Datos de grados:', data);

            // Llama a la función niveles correctamente
            const vistaProfesor = niveles(data.grados, data.nivel); // ✅ solo grados si no quieres el nombre del nivel
            // O bien: const vistaProfesor = niveles(data.grados, data.nivel); si modificaste la función para mostrar también el nombre del nivel

            continuarConVista(vistaProfesor, './views/classvw/niveles.css');
        })
        .catch(error => {
            console.error('Error al cargar grados del profesor:', error);
            mostrarErrorAlUsuario('No se pudieron cargar los grados del profesor');
        });

    } else {
        mostrarErrorAlUsuario('Rol no reconocido');
    }
}






function configurarManejadoresEventos() {
    // Asistencia de Profesores
    document.addEventListener('mostrarAsistenciaProfesores', async () => {
        try {
            const { nivelprofe } = await import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js');
            const view = nivelprofe();
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
            await cargarCSS('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar nivelprofe:', error);
        }
    });

    document.addEventListener('volverNivelProfe', async () => {
        try {
            const { nivelprofe } = await import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js');
            const view = nivelprofe();
    
            // Este listener permite volver a proyeccionDiv si se hace clic en el botón de "Regresar" desde nivelprofe
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
    
            await cargarCSS('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al regresar a nivelprofe:', error);
        }
    });
    
    
    

    // Grado de Profesores
    document.addEventListener('mostrarGradoProfe', async (e) => {
        const { nivelSeleccionado } = e.detail;
    
        try {
            const res = await fetch('http://localhost:3000/profesoresPorNivel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nivel: nivelSeleccionado })
            });
    
            const profesores = await res.json();
    
            const vista = gradoprofe(nivelSeleccionado, profesores);
            mostrarVista(vista);
            cargarCSS('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.css');
    
        } catch (error) {
            console.error('Error al cargar grados y profesores:', error);
            alert('Error al cargar grados y profesores');
        }
    });
    
    
      

    // Proyección Estudiantil
    document.addEventListener('mostrarProyeccionEst', async (e) => {
        const { profesor, profesorId, grado, gradoId, nivelSeleccionado } = e.detail;
    
        const mes = new Date().getMonth() + 1;
        const anio = new Date().getFullYear();
    
        try {
            const res = await fetch('http://localhost:3000/proyeccionProfesor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profesorId, gradoId, mes, anio })
            });
    
            const data = await res.json();
    
            if (data.ok) {
                const { proyeccionest } = await import('./vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.js');
                const vista = proyeccionest({
                    profesor,
                    datosSemanas: data.datos.filter(Boolean)
                });
    
                // Listener para botón regresar, vuelve a grados con nivel
                vista.addEventListener('volverGradoProfe', async () => {
                    const { gradoprofe } = await import('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.js');
    
                    try {
                        // Usar POST para pedir profesores por nivel (evita GET con nivel undefined)
                        const res = await fetch('http://localhost:3000/profesoresPorNivel', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nivel: nivelSeleccionado })
                        });
                        const profesores = await res.json();
    
                        const gradosView = gradoprofe(nivelSeleccionado, profesores);
                        mostrarVista(gradosView);
                        cargarCSS('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.css');
                    } catch (err) {
                        console.error('Error al cargar los profesores del nivel:', err);
                        alert('Error al regresar a los grados');
                    }
                });
    
                mostrarVista(vista);
                cargarCSS('./vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.css');
            } else {
                alert('No hay datos de asistencia para este profesor y grado');
            }
        } catch (error) {
            console.error('Error al obtener proyección:', error);
            alert('Error al cargar proyección');
        }
    });
    
      
      
      

    // Eliminar Profesor
    document.addEventListener('mostrarEliminarProfesor', async () => {
        try {
            const { niveleliminar } = await import('./vistacoordinador/eliminarprofesor/niveleliminar/nivleliminar.js');
            const view = niveleliminar();
            
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
            view.addEventListener('mostrarProfeEliminar', async (e) => {
                try {
                    const { profeeliminar } = await import('./vistacoordinador/eliminarprofesor/profeeliminar/profeeliminar.js');
                    const profeView = profeeliminar(e.detail.nivelSeleccionado);
                    
                    profeView.addEventListener('volverNivelEliminar', () => {
                        mostrarVista(view);
                    });

                    await cargarCSS('./vistacoordinador/eliminarprofesor/profeeliminar/profeeliminar.css');
                    mostrarVista(profeView);
                } catch (error) {
                    console.error('Error al cargar profeeliminar:', error);
                }
            });

            await cargarCSS('./vistacoordinador/eliminarprofesor/niveleliminar/niveleliminar.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar niveleliminar:', error);
        }
    });

    document.addEventListener('mostrarAsistenciaNiveles', async () => {
        try {
            const { nivelesasis } = await import('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.js');
            const { gradosasis } = await import('./vistacoordinador/asistencia-niveles/gradosasis/gradosasis.js');
            const { viewesta } = await import('./vistacoordinador/asistencia-niveles/viewsniveles/viewesta.js');
    
            const view = nivelesasis();
    
            view.addEventListener('mostrarGradoAsis', async (e) => {
                const nivel = e.detail.nivelSeleccionado;
    
                const gradoView = await gradosasis(nivel);
    
                gradoView.addEventListener('volverNivelesAsis', () => {
                    mostrarVista(view);
                });
    
                gradoView.addEventListener('mostrarViewEsta', async (e) => {
                    const vista = await viewesta(e.detail);
    
                    vista.addEventListener('volverGradosAsis', () => {
                        mostrarVista(gradoView);
                    });
    
                    mostrarVista(vista);
                });
    
                await cargarCSS('./vistacoordinador/asistencia-niveles/gradosasis/gradoasis.css');
                mostrarVista(gradoView);
            });
    
            view.addEventListener('volverProyeccion', () => {
                mostrarVista(proyeccionDiv);
            });
    
            await cargarCSS('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.css');
            mostrarVista(view);
        } catch (error) {
            console.error('❌ Error al cargar asistencia por niveles:', error);
        }
    });
    
    
    
    

   // Agregar Profesor
// Agregar Profesor
document.addEventListener('mostrarAgregarProfesor', async () => {
    let view, gradoView, alumnoView;
    let currentListeners = [];

    try {
        // Cargar vista de nivel
        const { nivelagregar } = await import('./vistacoordinador/agregar-profesor/nivelagregar/nivelagregar.js');
        view = nivelagregar();

        // Limpiar listeners anteriores
        currentListeners.forEach(({element, event, handler}) => {
            element.removeEventListener(event, handler);
        });
        currentListeners = [];

        // Configurar navegación
        const volverProyeccionHandler = () => {
            try {
                if (!proyeccionDiv || !(proyeccionDiv instanceof Node)) {
                    console.error('proyeccionDiv no es un nodo válido, recreando...');
                    proyeccionDiv = proyect(); // Vuelve a crear la vista si es necesario
                }
                mostrarVista(proyeccionDiv);
            } catch (error) {
                console.error('Error al volver a proyección:', error);
            }
        };

        // 🔧 FALTABA ESTO:
        view.addEventListener('volverProyeccion', volverProyeccionHandler);
        currentListeners.push({ element: view, event: 'volverProyeccion', handler: volverProyeccionHandler });

        // Handler para mostrar los grados según el nivel
        const mostrarGradoHandler = async (e) => {
            try {
                const { gradoagregar } = await import('./vistacoordinador/agregar-profesor/gradoagregar/gradoagregar.js');
                gradoView = gradoagregar(e.detail.nivelSeleccionado);

                // Limpiar listeners de vista anterior
                currentListeners.slice(1).forEach(({element, event, handler}) => {
                    element.removeEventListener(event, handler);
                });
                currentListeners = currentListeners.slice(0, 1);

                const volverNivelHandler = () => mostrarVista(view);
                gradoView.addEventListener('volverNivelAgregar', volverNivelHandler);
                currentListeners.push({element: gradoView, event: 'volverNivelAgregar', handler: volverNivelHandler});

                const mostrarAlumnoHandler = async (e) => {
                    try {
                        const { agregaralumno } = await import('./vistacoordinador/agregar-profesor/agregaralumno/agregaralumno.js');
                        alumnoView = agregaralumno(e.detail);

                        // Limpiar listeners anteriores de vista alumno
                        currentListeners.slice(2).forEach(({element, event, handler}) => {
                            element.removeEventListener(event, handler);
                        });
                        currentListeners = currentListeners.slice(0, 2);

                        const volverGradoHandler = () => mostrarVista(gradoView);
                        alumnoView.addEventListener('volverGradoAgregar', volverGradoHandler);
                        currentListeners.push({element: alumnoView, event: 'volverGradoAgregar', handler: volverGradoHandler});

                        await cargarVistaConCSS(alumnoView, './vistacoordinador/agregar-profesor/agregaralumno/agregaralumno.css');
                    } catch (error) {
                        console.error('Error al cargar agregaralumno:', error);
                        mostrarErrorAlUsuario('No se pudo cargar el formulario de profesor');
                    }
                };

                gradoView.addEventListener('mostrarAgregarAlumno', mostrarAlumnoHandler);
                currentListeners.push({element: gradoView, event: 'mostrarAgregarAlumno', handler: mostrarAlumnoHandler});

                await cargarVistaConCSS(gradoView, './vistacoordinador/agregar-profesor/gradoagregar/gradoagregar.css');
            } catch (error) {
                console.error('Error al cargar gradoagregar:', error);
                mostrarErrorAlUsuario('No se pudo cargar los grados');
            }
        };

        view.addEventListener('mostrarGradoAgregar', mostrarGradoHandler);
        currentListeners.push({ element: view, event: 'mostrarGradoAgregar', handler: mostrarGradoHandler });

        await cargarVistaConCSS(view, './vistacoordinador/agregar-profesor/nivelagregar/nivelagregar.css');
    } catch (error) {
        console.error('Error al cargar nivelagregar:', error);
        mostrarErrorAlUsuario('No se pudo iniciar el proceso de agregar profesor');
    }
});


// Función auxiliar
async function cargarVistaConCSS(view, cssPath) {
    await cargarCSS(cssPath);
    mostrarVista(view);
}

function mostrarErrorAlUsuario(mensaje) {
    // Implementa cómo mostrar errores al usuario (toast, alerta, etc.)
    console.error('Error para el usuario:', mensaje);
}

document.addEventListener('mostrarAsistenciaGrado', async (e) => {
    try {
        const { gradoSeleccionado } = e.detail; // ✅ Extrae el grado del evento

        // ✅ Asegúrate de que `asiscuadro` espera un objeto con gradoId y nombreGrado
        const view = await asiscuadro({ 
            gradoId: gradoSeleccionado.id, 
            nombreGrado: gradoSeleccionado.grado 
        });

        view.addEventListener('volverNiveles', async () => {
            const nivelesView = niveles(); // Aquí si necesitas pasar grados y nivel, deberías recuperar eso también
            nivelesView.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
            mostrarVista(nivelesView);
        });

        await cargarCSS('./views/asistenciavw/asistencia.css');
        mostrarVista(view);
    } catch (error) {
        console.error('Error al cargar asistencia:', error);
    }
});


    // Estadísticas Generales
    document.addEventListener('mostrarEstadisticasGenerales', async (e) => {
        try {
            const { grados, nivel } = e.detail; // ⬅️ Aquí capturamos los grados enviados desde niveles()
    
            const view = estg(grados); // ⬅️ Pasamos los grados a la función estg
    
            view.addEventListener('volverNiveles', async () => {
                const nivelesView = niveles(grados, nivel); // ⬅️ (opcional) si quieres reconstruir el mismo nivel
                nivelesView.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
                mostrarVista(nivelesView);
            });
    
            view.addEventListener('mostrarIndividual', (e) => {
                const individualView = individual(e.detail.grado);
    
                individualView.addEventListener('volverEstadisticas', () => {
                    mostrarVista(view);
                });
    
                cargarCSS('./estadisticas/individualest/individual.css');
                mostrarVista(individualView);
            });
    
            await cargarCSS('./estadisticas/generalest/estgeneral.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        }
    });
    

    // Asistencia Estudiantes (botón 1)
    document.addEventListener('mostrarAsistenciaEstudiantes', async () => {
        try {
            const { nivelesasis } = await import('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.js');
            const view = nivelesasis();
    
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
    
            view.addEventListener('mostrarGradoAsis', async (e) => {
                const nivelSeleccionado = e.detail.nivelSeleccionado;
    
                const response = await fetch('http://localhost:3000/obtenerGradosPorNivel', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nivel: nivelSeleccionado })
                });
    
                const data = await response.json(); // { grados, nivel }
    
                const { niveles } = await import('./views/classvw/niveles.js');
                const vistaGrados = niveles(data.grados, data.nivel);
    
                vistaGrados.addEventListener('volverProyeccion', () => mostrarVista(view));
                vistaGrados.addEventListener('mostrarEstadisticasGenerales', () => {
                    document.dispatchEvent(new CustomEvent('mostrarEstadisticasGenerales'));
                });
                vistaGrados.addEventListener('mostrarAsistenciaGrado', (ev) => {
                    document.dispatchEvent(new CustomEvent('mostrarAsistenciaGrado', { detail: ev.detail }));
                });
    
                await cargarCSS('./views/classvw/niveles.css');
                mostrarVista(vistaGrados);
            });
    
            await cargarCSS('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.css');
            mostrarVista(view);
    
        } catch (error) {
            console.error('Error al cargar nivelesasis:', error);
            mostrarErrorAlUsuario('No se pudo mostrar la selección de niveles');
        }
    });


}

// CARGAR VISTA: INGRESAR CÓDIGO
async function cargarIngCodigo() {
    try {
        const { ingcodigo } = await import('./recuperar/ingcodigo/ingcodigo.js');
        const view = ingcodigo();
        view.addEventListener('mostrarCorreo', () => {
            document.dispatchEvent(new CustomEvent('mostrarRecuperacion'));
        });
        view.addEventListener('mostrarCambioContra', () => {
            cargarCambioContra();
        });
        await cargarCSS('./recuperar/ingcodigo/ingcodigo.css');
        mostrarVista(view);
    } catch (error) {
        console.error('Error al cargar ingcodigo:', error);
    }
}

// CARGAR VISTA: CAMBIAR CONTRASEÑA
async function cargarCambioContra() {
    try {
        const { cambiocontra } = await import('./recuperar/cambiocontra/cambiocontra.js');
        
        // Solo pasa el callback, no necesitas eventos aquí
        const view = cambiocontra(() => mostrarVista(h_login(handleLogin)));

        await cargarCSS('./recuperar/cambiocontra/cambiocontra.css');
        mostrarVista(view);
    } catch (error) {
        console.error('Error al cargar cambiocontra:', error);
    }
}

// MANEJO DE RECUPERACIÓN DE CONTRASEÑA
document.addEventListener('mostrarRecuperacion', async () => {
    try {
        const { ingcorreo } = await import('./recuperar/ingcorreo/ingcorreo.js');
        const view = ingcorreo();

        view.addEventListener('mostrarLogin', () => {
            mostrarVista(h_login(handleLogin));
        });

        document.addEventListener('mostrarCodigo', () => {
            cargarIngCodigo();  // ✅ Ya está definida
        });

        await cargarCSS('./recuperar/ingcorreo/ingcorreo.css');
        mostrarVista(view);
    } catch (error) {
        console.error('Error al cargar ingcorreo:', error);
    }
});

// Mostrar login al inicio
mostrarVista(h_login(handleLogin));

// Listener adicional por si viene de otro lugar
document.addEventListener('mostrarCambioContra', () => {
    cargarCambioContra();
});