import { h_login } from './views/loginvw/login.js';
import { niveles } from './views/classvw/niveles.js';
import { asiscuadro } from './views/asistenciavw/asistencia.js';
import { estg } from './estadisticas/generalest/estgeneral.js';
import { individual } from './estadisticas/individualest/individual.js';
import { proyect } from './vistacoordinador/proyecciones/proyeccion.js';

const root = document.getElementById('root');
let currentView = null;
let proyeccionDiv = null; // Guardamos referencia a la vista de proyección

function mostrarVista(vista) {
    root.innerHTML = '';
    root.appendChild(vista);
    currentView = vista;
}

function handleLogin(email, password) {
    if (email === 'admin@example.com' && password === '123456') {
        proyeccionDiv = proyect(); // Creamos la vista de proyección

        // Evento cerrar sesión
        proyeccionDiv.addEventListener('cerrarSesion', () => {
            mostrarVista(h_login(handleLogin));
        });

        // Evento para asistencia de profesores
        document.addEventListener('mostrarAsistenciaProfesores', () => {
            import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js')
                .then(module => {
                    const nivelProfeView = module.nivelprofe();
                    
                    // Configurar evento para volver a proyección
                    nivelProfeView.addEventListener('volverProyeccion', () => {
                        mostrarVista(proyeccionDiv);
                    });

                    if (!document.querySelector('link[href*="nivelprofe.css"]')) {
                        const css = document.createElement('link');
                        css.rel = 'stylesheet';
                        css.href = './vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.css';
                        document.head.appendChild(css);
                    }

                    mostrarVista(nivelProfeView);
                })
                .catch(error => {
                    console.error('Error al cargar nivelprofe.js:', error);
                });
        });

        // Evento para grados de profesores
        document.addEventListener('mostrarGradoProfe', (e) => {
            import('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.js')
                .then(module => {
                    const gradoProfeView = module.gradoprofe(e.detail.nivelSeleccionado);
                    
                    // Configurar evento para volver a nivelprofe
                    gradoProfeView.addEventListener('volverNivelProfe', () => {
                        import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js')
                            .then(module => {
                                const nivelProfeView = module.nivelprofe();
                                
                                // Reconfigurar evento para volver a proyección
                                nivelProfeView.addEventListener('volverProyeccion', () => {
                                    mostrarVista(proyeccionDiv);
                                });

                                mostrarVista(nivelProfeView);
                            });
                    });

                    if (!document.querySelector('link[href*="gradoprofe.css"]')) {
                        const css = document.createElement('link');
                        css.rel = 'stylesheet';
                        css.href = './vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.css';
                        document.head.appendChild(css);
                    }

                    mostrarVista(gradoProfeView);
                })
                .catch(error => {
                    console.error('Error al cargar gradoprofe.js:', error);
                });
        });

        // Evento para proyección semanal
        document.addEventListener('mostrarProyeccionEst', (e) => {
            import('./vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.js')
                .then(module => {
                    const proyeccionEstView = module.proyeccionest(e.detail);
                    
                    // Configurar evento para volver a gradoprofe
                    proyeccionEstView.addEventListener('volverGradoProfe', () => {
                        import('./vistacoordinador/asistencia-profesores/gradoprofe/gradoprofe.js')
                            .then(module => {
                                const gradoProfeView = module.gradoprofe(e.detail.grado);
                                
                                // Reconfigurar eventos de navegación
                                gradoProfeView.addEventListener('volverNivelProfe', () => {
                                    import('./vistacoordinador/asistencia-profesores/nivelprofe/nivelprofe.js')
                                        .then(module => {
                                            const nivelProfeView = module.nivelprofe();
                                            
                                            nivelProfeView.addEventListener('volverProyeccion', () => {
                                                mostrarVista(proyeccionDiv);
                                            });

                                            mostrarVista(nivelProfeView);
                                        });
                                });

                                mostrarVista(gradoProfeView);
                            });
                    });

                    if (!document.querySelector('link[href*="proyeccionest.css"]')) {
                        const css = document.createElement('link');
                        css.rel = 'stylesheet';
                        css.href = './vistacoordinador/asistencia-profesores/proyeccionest/proyeccionest.css';
                        document.head.appendChild(css);
                    }

                    mostrarVista(proyeccionEstView);
                })
                .catch(error => {
                    console.error('Error al cargar proyeccionest.js:', error);
                });
        });

        // Evento para Eliminar Profesores - Implementación corregida
        document.addEventListener('mostrarEliminarProfesor', () => {
            import('./vistacoordinador/eliminarprofesor/niveleliminar/nivleliminar.js')
                .then(module => {
                    const nivelEliminarView = module.niveleliminar();
                    
                    // Configurar evento para volver a proyección
                    nivelEliminarView.addEventListener('volverProyeccion', () => {
                        mostrarVista(proyeccionDiv);
                    });

                    // Configurar evento para mostrar profesores a eliminar
                    nivelEliminarView.addEventListener('mostrarProfeEliminar', (e) => {
                        import('./vistacoordinador/eliminarprofesor/profeeliminar/profeeliminar.js')
                            .then(module => {
                                const profeEliminarView = module.profeeliminar(e.detail.nivelSeleccionado);
                                
                                // Configurar evento para volver a niveleliminar
                                profeEliminarView.addEventListener('volverNivelEliminar', () => {
                                    mostrarVista(nivelEliminarView);
                                });

                                // Cargar CSS si no está cargado
                                if (!document.querySelector('link[href*="profeeliminar.css"]')) {
                                    const css = document.createElement('link');
                                    css.rel = 'stylesheet';
                                    css.href = './vistacoordinador/eliminarprofesor/profeeliminar/profeeliminar.css';
                                    document.head.appendChild(css);
                                }

                                mostrarVista(profeEliminarView);
                            })
                            .catch(error => {
                                console.error('Error al cargar profeeliminar.js:', error);
                            });
                    });

                    // Cargar CSS si no está cargado
                    if (!document.querySelector('link[href*="niveleliminar.css"]')) {
                        const css = document.createElement('link');
                        css.rel = 'stylesheet';
                        css.href = './vistacoordinador/eliminarprofesor/niveleliminar/niveleliminar.css';
                        document.head.appendChild(css);
                    }

                    mostrarVista(nivelEliminarView);
                })
                .catch(error => {
                    console.error('Error al cargar nivleliminar.js:', error);
                });
        });
        // Evento para Asistencia por Niveles
document.addEventListener('mostrarAsistenciaNiveles', () => {
    import('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.js')
        .then(module => {
            const nivelesAsisView = module.nivelesasis();
            
            nivelesAsisView.addEventListener('volverProyeccion', () => {
                mostrarVista(proyeccionDiv);
            });

            // Evento para mostrar grados
            nivelesAsisView.addEventListener('mostrarGradoAsis', (e) => {
                import('./vistacoordinador/asistencia-niveles/gradosasis/gradosasis.js')
                    .then(module => {
                        const gradoAsisView = module.gradosasis(e.detail.nivelSeleccionado);
                        
                        gradoAsisView.addEventListener('volverNivelesAsis', () => {
                            mostrarVista(nivelesAsisView);
                        });

                        if (!document.querySelector('link[href*="gradoasis.css"]')) {
                            const css = document.createElement('link');
                            css.rel = 'stylesheet';
                            css.href = './vistacoordinador/asistencia-niveles/gradosasis/gradoasis.css';
                            document.head.appendChild(css);
                        }

                        mostrarVista(gradoAsisView);
                    })
                    .catch(error => {
                        console.error('Error al cargar gradosasis.js:', error);
                    });
            });
            // Evento para mostrar estadísticas de grado
document.addEventListener('mostrarViewEsta', (e) => {
    import('./vistacoordinador/asistencia-niveles/viewsniveles/viewesta.js')
        .then(module => {
            const viewEstaView = module.viewesta(e.detail);
            
            // Configurar evento para volver a gradosasis
            viewEstaView.addEventListener('volverGradosAsis', () => {
                import('./vistacoordinador/asistencia-niveles/gradosasis/gradosasis.js')
                    .then(module => {
                        const gradoAsisView = module.gradosasis(e.detail.nivel);
                        
                        gradoAsisView.addEventListener('volverNivelesAsis', () => {
                            import('./vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.js')
                                .then(module => {
                                    const nivelesAsisView = module.nivelesasis();
                                    
                                    nivelesAsisView.addEventListener('volverProyeccion', () => {
                                        mostrarVista(proyeccionDiv);
                                    });

                                    mostrarVista(nivelesAsisView);
                                });
                        });

                        mostrarVista(gradoAsisView);
                    });
            });

            if (!document.querySelector('link[href*="viewesta.css"]')) {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = './vistacoordinador/asistencia-niveles/viewsniveles/viewesta.css';
                document.head.appendChild(css);
            }

            mostrarVista(viewEstaView);
        })
        .catch(error => {
            console.error('Error al cargar viewesta.js:', error);
        });
});

            if (!document.querySelector('link[href*="nivelesasis.css"]')) {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = './vistacoordinador/asistencia-niveles/nivelesasis/nivelesasis.css';
                document.head.appendChild(css);
            }

            mostrarVista(nivelesAsisView);
        })
        .catch(error => {
            console.error('Error al cargar nivelesasis.js:', error);
        });
});
// Evento para Agregar Profesor
document.addEventListener('mostrarAgregarProfesor', () => {
    import('./vistacoordinador/agregar-profesor/nivelagregar/nivelagregar.js')
        .then(module => {
            const nivelAgregarView = module.nivelagregar();
            
            nivelAgregarView.addEventListener('volverProyeccion', () => {
                mostrarVista(proyeccionDiv);
            });

            // Evento para mostrar grados
            nivelAgregarView.addEventListener('mostrarGradoAgregar', (e) => {
                import('./vistacoordinador/agregar-profesor/gradoagregar/gradoagregar.js')
                    .then(module => {
                        const gradoAgregarView = module.gradoagregar(e.detail.nivelSeleccionado);
                        
                        gradoAgregarView.addEventListener('volverNivelAgregar', () => {
                            mostrarVista(nivelAgregarView);
                        });

                        // Evento para mostrar formulario de agregar
                        gradoAgregarView.addEventListener('mostrarAgregarAlumno', (e) => {
                            import('./vistacoordinador/agregar-profesor/agregaralumno/agregaralumno.js')
                                .then(module => {
                                    const agregarAlumnoView = module.agregaralumno(e.detail);
                                    
                                    agregarAlumnoView.addEventListener('volverGradoAgregar', () => {
                                        mostrarVista(gradoAgregarView);
                                    });

                                    if (!document.querySelector('link[href*="agregaralumno.css"]')) {
                                        const css = document.createElement('link');
                                        css.rel = 'stylesheet';
                                        css.href = './vistacoordinador/agregar-profesor/agregaralumno/agregaralumno.css';
                                        document.head.appendChild(css);
                                    }

                                    mostrarVista(agregarAlumnoView);
                                });
                        });

                        if (!document.querySelector('link[href*="gradoagregar.css"]')) {
                            const css = document.createElement('link');
                            css.rel = 'stylesheet';
                            css.href = './vistacoordinador/agregar-profesor/gradoagregar/gradoagregar.css';
                            document.head.appendChild(css);
                        }

                        mostrarVista(gradoAgregarView);
                    });
            });

            if (!document.querySelector('link[href*="nivelagregar.css"]')) {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = './vistacoordinador/agregar-profesor/nivelagregar/nivelagregar.css';
                document.head.appendChild(css);
            }

            mostrarVista(nivelAgregarView);
        })
        .catch(error => {
            console.error('Error al cargar nivelagregar.js:', error);
        });
});

        // Cargar CSS de proyección
        if (!document.querySelector('link[href*="proyeccion.css"]')) {
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = './vistacoordinador/proyecciones/proyeccion.css';
            document.head.appendChild(css);
        }

        mostrarVista(proyeccionDiv);
    } else {
        alert('Correo o contraseña incorrectos');
    }
}

// Manejo de recuperación de contraseña
document.addEventListener('mostrarRecuperacion', () => {
    import('./recuperar/ingcorreo/ingcorreo.js')
        .then(module => {
            const ingcorreoView = module.ingcorreo();
            ingcorreoView.addEventListener('mostrarLogin', () => {
                mostrarVista(h_login(handleLogin));
            });
            ingcorreoView.addEventListener('mostrarCodigo', () => {
                cargarIngCodigo();
            });
            mostrarVista(ingcorreoView);
        })
        .catch(error => {
            console.error('Error al cargar ingcorreo:', error);
        });
});

function cargarIngCodigo() {
    import('./recuperar/ingcodigo/ingcodigo.js')
        .then(module => {
            const ingcodigoView = module.ingcodigo();
            ingcodigoView.addEventListener('mostrarCorreo', () => {
                document.dispatchEvent(new CustomEvent('mostrarRecuperacion'));
            });
            ingcodigoView.addEventListener('mostrarCambioContra', () => {
                cargarCambioContra();
            });
            mostrarVista(ingcodigoView);
        })
        .catch(error => {
            console.error('Error al cargar ingcodigo:', error);
        });
}

function cargarCambioContra() {
    import('./recuperar/cambiocontra/cambiocontra.js')
        .then(module => {
            const cambiocontraView = module.cambiocontra();
            cambiocontraView.addEventListener('mostrarLogin', () => {
                mostrarVista(h_login(handleLogin));
            });
            mostrarVista(cambiocontraView);
        })
        .catch(error => {
            console.error('Error al cargar cambiocontra:', error);
        });
}

// Mostrar login al inicio
mostrarVista(h_login(handleLogin));