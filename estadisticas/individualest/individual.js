function individual(grado) {
    const contenedor = document.createElement('div');
    contenedor.className = 'individual-container';

    // Header con título y botón de regresar
    const header = document.createElement('div');
    header.className = 'individual-header';

    const titulo = document.createElement('h2');
    titulo.textContent = `${grado} COMPUTACIÓN`;
    header.appendChild(titulo);

    const volverBtn = document.createElement('button');
    volverBtn.className = 'btn-regresar';
    volverBtn.textContent = 'Regresar';
    volverBtn.addEventListener('click', () => {
        const event = new CustomEvent('volverEstadisticas', { bubbles: true });
        contenedor.dispatchEvent(event);
    });
    header.appendChild(volverBtn);

    contenedor.appendChild(header);

    // Gráfico circular (simulado)
    const graficoContainer = document.createElement('div');
    graficoContainer.className = 'grafico-circular-container';

    // Porcentajes (simulados - estos vendrán de la base de datos)
    const porcentajes = [65, 65, 65, 65, 65, 65, 65, 65, 65, 65]; // Ejemplo con valores iguales

    porcentajes.forEach((porcentaje, index) => {
        const item = document.createElement('div');
        item.className = 'grafico-item';

        const circulo = document.createElement('div');
        circulo.className = 'circulo';
        circulo.style.background = `conic-gradient(#4CAF50 ${porcentaje}%, #f0f0f0 ${porcentaje}% 100%)`;

        const porcentajeText = document.createElement('span');
        porcentajeText.className = 'porcentaje-text';
        porcentajeText.textContent = `${porcentaje}%`;

        item.appendChild(circulo);
        item.appendChild(porcentajeText);
        graficoContainer.appendChild(item);
    });

    contenedor.appendChild(graficoContainer);

    return contenedor;
}

export { individual };