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
    root.innerHTML = '';
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

function handleLogin(email, password) {
    if (email === 'admin@example.com' && password === '123456') {
        // Limpiar listener anterior si existe
        if (cerrarSesionHandler) {
            document.removeEventListener('cerrarSesion', cerrarSesionHandler);
        }

        // Crear nueva vista de proyección
        proyeccionDiv = proyect();

        // Configurar handler para cerrar sesión
        cerrarSesionHandler = () => {
            console.log('Cerrando sesión...');
            mostrarVista(h_login(handleLogin));
        };
        document.addEventListener('cerrarSesion', cerrarSesionHandler);

        // Configurar todos los manejadores de eventos
        configurarManejadoresEventos();

        // Cargar CSS de proyección
        cargarCSS('./vistacoordinador/proyecciones/proyeccion.css');
        mostrarVista(proyeccionDiv);
    } else {
        alert('Correo o contraseña incorrectos');
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
        try {
            const { nivelagregar } = await import('./vistacoordinador/agregar-profesor/nivelagregar/nivelagregar.js');
            const view = nivelagregar();
            
            view.addEventListener('volverProyeccion', () => mostrarVista(proyeccionDiv));
            view.addEventListener('mostrarGradoAgregar', async (e) => {
                try {
                    const { gradoagregar } = await import('./vistacoordinador/agregar-profesor/gradoagregar/gradoagregar.js');
                    const gradoView = gradoagregar(e.detail.nivelSeleccionado);
                    
                    gradoView.addEventListener('volverNivelAgregar', () => {
                        mostrarVista(view);
                    });

                    gradoView.addEventListener('mostrarAgregarAlumno', async (e) => {
                        try {
                            const { agregaralumno } = await import('./vistacoordinador/agregar-profesor/agregaralumno/agregaralumno.js');
                            const alumnoView = agregaralumno(e.detail);
                            
                            alumnoView.addEventListener('volverGradoAgregar', () => {
                                mostrarVista(gradoView);
                            });

                            await cargarCSS('./vistacoordinador/agregar-profesor/agregaralumno/agregaralumno.css');
                            mostrarVista(alumnoView);
                        } catch (error) {
                            console.error('Error al cargar agregaralumno:', error);
                        }
                    });

                    await cargarCSS('./vistacoordinador/agregar-profesor/gradoagregar/gradoagregar.css');
                    mostrarVista(gradoView);
                } catch (error) {
                    console.error('Error al cargar gradoagregar:', error);
                }
            });

            await cargarCSS('./vistacoordinador/agregar-profesor/nivelagregar/nivelagregar.css');
            mostrarVista(view);
        } catch (error) {
            console.error('Error al cargar nivelagregar:', error);
        }
    });

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

// Manejo de recuperación de contraseña
document.addEventListener('mostrarRecuperacion', async () => {
    try {
        const { ingcorreo } = await import('./recuperar/ingcorreo/ingcorreo.js');
        const view = ingcorreo();
        view.addEventListener('mostrarLogin', () => {
            mostrarVista(h_login(handleLogin));
        });
        view.addEventListener('mostrarCodigo', () => {
            cargarIngCodigo();
        });
        await cargarCSS('./recuperar/ingcorreo/ingcorreo.css');
        mostrarVista(view);
    } catch (error) {
        console.error('Error al cargar ingcorreo:', error);
    }
});

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

// Mostrar login al inicio
mostrarVista(h_login(handleLogin));