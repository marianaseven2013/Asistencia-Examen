import { h_login } from './views/loginvw/login.js';
import { niveles } from './views/classvw/niveles.js';
import { asiscuadro } from './views/asistenciavw/asistencia.js';
import { estg } from './estadisticas/generalest/estgeneral.js';


const root = document.getElementById('root');

let loginDiv = h_login(handleLogin);
let nivelesDiv = niveles();
const asistenciaDiv = asiscuadro(); // <-- Esta línea ya existe en tu código

function mostrarVista(vista) {
    root.innerHTML = '';
    root.appendChild(vista);
}

function handleLogin(email, password) {
    if (email === 'admin@example.com' && password === '123456') {
        nivelesDiv = niveles();

        // Escuchar el botón de cerrar sesión
        nivelesDiv.addEventListener('cerrarSesion', () => {
            loginDiv = h_login(handleLogin);
            mostrarVista(loginDiv);
        });

        // Escuchar clic en el botón de estadísticas (clase .distica)
        nivelesDiv.querySelector('.distica')?.addEventListener('click', () => {
            const vistaEst = estg();
            vistaEst.addEventListener('volverNiveles', () => {
                mostrarVista(nivelesDiv);
            });
            mostrarVista(vistaEst);
        });

        mostrarVista(asistenciaDiv);
    } else {
        alert('Correo o contraseña incorrectos');
    }
}



// Eventos para recuperación de contraseña

document.addEventListener('mostrarRecuperacion', () => {
    import('./recuperar/ingcorreo/ingcorreo.js')
        .then(module => {
            const ingcorreoView = module.ingcorreo();
            ingcorreoView.addEventListener('mostrarLogin', () => {
                loginDiv = h_login(handleLogin);
                mostrarVista(loginDiv);
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
                loginDiv = h_login(handleLogin);
                mostrarVista(loginDiv);
            });
            mostrarVista(cambiocontraView);
        })
        .catch(error => {
            console.error('Error al cargar cambiocontra:', error);
        });
}

mostrarVista(loginDiv);

// Evento para mostrar estadísticas generales
root.addEventListener('mostrarEstadisticas', () => {
    const vistaEst = estg();
    mostrarVista(vistaEst);

    // Cargar CSS si no está ya cargado
    if (!document.querySelector('link[href*="estgeneral.css"]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = './estadisticas/generalest/estgeneral.css';
        document.head.appendChild(css);
    }
});

// Evento para volver a niveles desde estadísticas
root.addEventListener('volverNiveles', () => {
    nivelesDiv = niveles();

    nivelesDiv.addEventListener('cerrarSesion', () => {
        loginDiv = h_login(handleLogin);
        mostrarVista(loginDiv);
    });

    mostrarVista(nivelesDiv);
});
