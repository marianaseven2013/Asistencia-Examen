function niveles() {
    let nv_les = document.createElement('div');
    nv_les.className = "niveles"; 

    let welcome = document.createElement('div');
    welcome.className = "cuadro-nivel";

    let benw = document.createElement('div');
    benw.className = "welcomen";
    benw.innerText = "Bienvenido profesor..."
    welcome.appendChild(benw)

    let estad = document.createElement('button');
    estad.className = "distica";
    estad.innerText = "Estadisticas";

    // Evento para cambiar a vista de estadísticas
    estad.addEventListener('click', () => {
        const event = new CustomEvent('mostrarEstadisticas', { bubbles: true });
        nv_les.dispatchEvent(event);
    });

    nv_les.appendChild(estad);

    let hola1 = document.createElement('button');
    hola1.className = "hola11";
    hola1.innerText = "IV COMPUTACION";
    nv_les.appendChild(hola1);

    let hola2 = document.createElement('button');
    hola2.className = "hola12";
    hola2.innerText = "V COMPUTACION";
    nv_les.appendChild(hola2);

    let hola3 = document.createElement('button');
    hola3.className = "hola13";
    hola3.innerText = "IV BIOLOGICAS";
    nv_les.appendChild(hola3);

    let hola4 = document.createElement('button');
    hola4.className = "hola14";
    hola4.innerText = "V BIOLOGICAS";
    nv_les.appendChild(hola4);

    let hola5 = document.createElement('button');
    hola5.className = "hola15";
    hola5.innerText = "IV PERITO";
    nv_les.appendChild(hola5);

    let cerrar = document.createElement('button');
    cerrar.className = "cerrar-sesion";
    cerrar.innerText = "Cerrar Sesion(regresar)";
    
    cerrar.addEventListener('click', () => {
        const event = new CustomEvent('cerrarSesion', {
            bubbles: true,
            detail: { action: 'logout' }
        });
        nv_les.dispatchEvent(event);
    });

    nv_les.appendChild(cerrar);
    nv_les.appendChild(welcome);

    return nv_les;
}

export { niveles };
