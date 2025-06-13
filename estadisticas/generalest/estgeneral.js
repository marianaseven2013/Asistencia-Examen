// estgeneral.js

function estg() {
    const contenedor = document.createElement('div');
    contenedor.className = 'estadisticas-container';

    // Botón de descarga y regresar
    const header = document.createElement('div');
    header.className = 'estadisticas-header';

    const descargar = document.createElement('button');
    descargar.className = 'btn-descargar';
    descargar.textContent = '\u2B07'; // Flecha hacia abajo

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

    // Gráfico (barras)
    const grafica = document.createElement('div');
    grafica.className = 'grafica-barras';

    const grados = ['VC', 'VD', 'VB', 'IVC', 'IVB', 'IVPC', 'VPC', 'VIPC'];
    const valores = [8, 7, 9, 5, 6, 10, 7, 6];

    grados.forEach((grado, i) => {
        const barraCont = document.createElement('div');
        barraCont.className = 'barra-contenedor';

        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = (valores[i] * 10) + 'px'; // Altura simulada

        const etiqueta = document.createElement('div');
        etiqueta.className = 'etiqueta';
        etiqueta.textContent = grado;

        barraCont.appendChild(barra);
        barraCont.appendChild(etiqueta);
        grafica.appendChild(barraCont);
    });

    contenedor.appendChild(grafica);

    // Contenedor de botones de grados
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-grados';

    grados.forEach(grado => {
        const btn = document.createElement('button');
        btn.className = 'btn-grado';
        btn.textContent = grado;

        // ✅ Emitir el evento mostrarIndividual al hacer clic
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
