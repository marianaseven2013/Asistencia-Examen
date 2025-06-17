import { h_login } from './views/loginvw/login.js';
import { niveles } from './views/classvw/niveles.js';
import { asiscuadro } from './views/asistenciavw/asistencia.js';
import { estg } from './estadisticas/generalest/estgeneral.js';
import { individual } from './estadisticas/individualest/individual.js';
import { proyect } from './vistacoordinador/proyecciones/proyeccion.js';

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
    // Limpiar listener anterior si existe
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
        continuarConVista(vistaCoordinador, './vistacoordinador/proyecciones/proyeccion.css');

    } else if (rol === 'profesor') {
        // Fetch de grados para el profesor - CON MEJOR MANEJO DE ERRORES
        // NUEVA RUTA Y ESTRUCTURA
fetch('http://localhost:3000/obtenerGradosPorProfesorYNivel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: email, nivel: nivel }) // <- AQUI CAMBIAMOS
})
.then(response => {
    if (!response.ok) {
        return response.json().then(errData => {
            throw new Error(errData.mensaje || `Error ${response.status}: ${response.statusText}`);
        });
    }
    return response.json();
})
.then(data => {
    console.log('Respuesta de grados:', data);

    if (data && data.grados && Array.isArray(data.grados)) {
        const vistaProfesor = niveles(data.grados);
        continuarConVista(vistaProfesor, './views/classvw/niveles.css');
    } else {
        const errorMsg = data?.mensaje || 'No se encontraron grados para este profesor';
        console.warn('Respuesta inesperada del backend:', data);
        mostrarErrorAlUsuario(errorMsg);
    }
})
.catch(error => {
    console.error('Error al obtener grados del profesor:', error);
    mostrarErrorAlUsuario(error.message || 'Error al cargar los grados del profesor');
});

        
    } else {
        mostrarErrorAlUsuario('Rol no reconocido');
    }
}

// Función auxiliar para mostrar errores
function mostrarErrorAlUsuario(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;
    errorDiv.style.color = 'red';
    errorDiv.style.margin = '10px 0';
    errorDiv.style.padding = '10px';
    errorDiv.style.border = '1px solid red';
    errorDiv.style.borderRadius = '4px';
    
    // Buscar un lugar adecuado para mostrar el error
    const appContainer = document.getElementById('app') || document.body;
    appContainer.prepend(errorDiv);
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
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

    // Grado de Profesores
    document.addEventListener('mostrarGradoProfe', async (e) => {
        try {
            const { gradoprofe } = await import('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.js');
            const view = gradoprofe(e.detail.nivelSeleccionado);
            
            view.addEventListener('volverNivelProfe', async () => {
                const { nivelprofe } = await import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js');
                const nivelView = nivelprofe();
                nivelView.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
                mostrarVista(nivelView);
            });

            await cargarCSS('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar gradoprofe:', error);
        }
    });

    // Proyección Estudiantil
    document.addEventListener('mostrarProyeccionEst', async (e) => {
        try {
            const { proyeccionest } = await import('./vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.js');
            const view = proyeccionest(e.detail);
            
            view.addEventListener('volverGradoProfe', async () => {
                const { gradoprofe } = await import('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.js');
                const gradoView = gradoprofe(e.detail.grado);
                
                gradoView.addEventListener('volverNivelProfe', async () => {
                    const { nivelprofe } = await import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js');
                    const nivelView = nivelprofe();
                    nivelView.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
                    mostrarVista(nivelView);
                });

                mostrarVista(gradoView);
            });

            await cargarCSS('./vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar proyeccionest:', error);
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

    // Asistencia Niveles
    document.addEventListener('mostrarAsistenciaNiveles', async () => {
        try {
            const { nivelesasis } = await import('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.js');
            const view = nivelesasis();
            
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
            view.addEventListener('mostrarGradoAsis', async (e) => {
                try {
                    const { gradosasis } = await import('./vistacoordinador/asistencia-niveles/gradosasis/gradosasis.js');
                    const gradoView = gradosasis(e.detail.nivelSeleccionado);
                    
                    gradoView.addEventListener('volverNivelesAsis', () => {
                        mostrarVista(view);
                    });
                    const vista = await gradosasis(nivelSeleccionado, correo);
mostrarVista(vista);


                    await cargarCSS('./vistacoordinador/asistencia-niveles/gradosasis/gradoasis.css');
                    mostrarVista(gradoView);
                } catch (error) {
                    console.error('Error al cargar gradosasis:', error);
                }
            });

            await cargarCSS('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar nivelesasis:', error);
        }
    });

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
                // Manejo de error alternativo
            }
        };

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
                        
                        // Limpiar listeners de vista anterior
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
        currentListeners.push({element: view, event: 'mostrarGradoAgregar', handler: mostrarGradoHandler});

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

    // Asistencia Grado (Estudiantes)
    document.addEventListener('mostrarAsistenciaGrado', async (e) => {
        try {
            const view = asiscuadro(e.detail.nivelSeleccionado);
            
            view.addEventListener('volverNiveles', async () => {
                const nivelesView = niveles();
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
    document.addEventListener('mostrarEstadisticasGenerales', async () => {
        try {
            const view = estg();
            
            view.addEventListener('volverNiveles', async () => {
                const nivelesView = niveles();
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

    // Asistencia Estudiantes
    document.addEventListener('mostrarAsistenciaEstudiantes', async () => {
        try {
            const view = niveles();
            
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
            view.addEventListener('mostrarEstadisticasGenerales', () => {
                document.dispatchEvent(new CustomEvent('mostrarEstadisticasGenerales'));
            });

            view.addEventListener('mostrarAsistenciaGrado', (e) => {
                document.dispatchEvent(new CustomEvent('mostrarAsistenciaGrado', { detail: e.detail }));
            });

            await cargarCSS('./views/classvw/niveles.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar niveles:', error);
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
        const view = cambiocontra();
        view.addEventListener('mostrarLogin', () => {
            mostrarVista(h_login(handleLogin));
        });
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

