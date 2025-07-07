function estg(grados) {
    const contenedor = document.createElement('div');
    contenedor.className = 'estadisticas-container';

    const header = document.createElement('div');
    header.className = 'estadisticas-header';

    const descargar = document.createElement('button');
    descargar.className = 'btn-descargar';
    descargar.textContent = '\u2B07'; // Flecha

    const regresar = document.createElement('button');
    regresar.className = 'btn-regresar';
    regresar.textContent = 'Regresar';
    regresar.addEventListener('click', () => {
        const event = new CustomEvent('volverNiveles', { bubbles: true });
        contenedor.dispatchEvent(event);
    });

    header.appendChild(descargar);
    header.appendChild(regresar);
    contenedor.appendChild(header);

    // Contenedor para la gráfica
    const grafica = document.createElement('div');
    grafica.className = 'grafica-barras';

    grados.forEach(grado => {
        const barraCont = document.createElement('div');
        barraCont.className = 'barra-contenedor';

        const barra = document.createElement('div');
        barra.className = 'barra';
        // Aquí puedes usar un valor real si lo tienes. Por ahora, simulamos:
        barra.style.height = (Math.floor(Math.random() * 10) + 1) * 10 + 'px';

        const etiqueta = document.createElement('div');
        etiqueta.className = 'etiqueta';
        etiqueta.textContent = grado.grado;

        barraCont.appendChild(barra);
        barraCont.appendChild(etiqueta);
        grafica.appendChild(barraCont);
    });

    contenedor.appendChild(grafica);

    // Botones para cada grado
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-grados';

    grados.forEach(grado => {
        const btn = document.createElement('button');
        btn.className = 'btn-grado';
        btn.textContent = grado.grado;

        btn.addEventListener('click', () => {
            const event = new CustomEvent('mostrarIndividual', { 
                bubbles: true, 
                detail: { grado } 
            });
            contenedor.dispatchEvent(event);
        });

        botonesContainer.appendChild(btn);
    });

    contenedor.appendChild(botonesContainer);

    return contenedor;
}

export { estg };

