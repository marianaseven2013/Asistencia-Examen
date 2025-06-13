import { asiscuadro } from '../asistenciavw/asistencia.js';

function niveles() {
    let nv_les = document.createElement('div');
    nv_les.className = "niveles"; 

    let welcome = document.createElement('div');
    welcome.className = "cuadro-nivel";

    let benw = document.createElement('div');
    benw.className = "welcomen";
    benw.innerText = "Bienvenido profesor...";
    welcome.appendChild(benw);
    nv_les.appendChild(welcome);

    let estad = document.createElement('button');
    estad.className = "distica";
    estad.innerText = "Estadísticas";
    nv_les.appendChild(estad);

    // Generación dinámica
    const cursos = [
        "IV COMPUTACION",
        "V COMPUTACION",
        "IV BIOLOGICAS",
        "V BIOLOGICAS",
        "IV PERITO",
        "VI COMPUTACION",
        "VI BIOLOGICAS"
    ];

    cursos.forEach((curso, index) => {
        let btnCurso = document.createElement('button');
        btnCurso.className = `curso-btn`;
        btnCurso.innerText = curso;

        // Enviamos evento al index.js
        btnCurso.addEventListener('click', () => {
            const eventoAsistencia = new CustomEvent('mostrarAsistencia', {
                bubbles: true,
                detail: { curso }
            });
            nv_les.dispatchEvent(eventoAsistencia);
        });

        nv_les.appendChild(btnCurso);
    });

    let cerrar = document.createElement('button');
    cerrar.className = "cerrar-sesion";
    cerrar.innerText = "Cerrar Sesión (Regresar)";

    cerrar.addEventListener('click', () => {
        const event = new CustomEvent('cerrarSesion', {
            bubbles: true,
            detail: { action: 'logout' }
        });
        nv_les.dispatchEvent(event);
    });

    nv_les.appendChild(cerrar);

    return nv_les;
}

export { niveles };
