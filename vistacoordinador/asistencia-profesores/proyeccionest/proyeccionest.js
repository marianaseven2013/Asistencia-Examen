function proyeccionest(datos) {
    let contenedor = document.createElement('div');
    contenedor.className = "proyeccionest-container";

    // Estado del calendario
    let estado = {
        mesActual: new Date().getMonth(),
        añoActual: new Date().getFullYear(),
        datosSemanas: generarDatosEjemplo() // Datos de ejemplo (reemplazar por API)
    };

    // Nombres de los meses
    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    function generarDatosEjemplo() {
        // Datos de ejemplo - reemplazar con llamada a API
        return [
            { estado: 'verde', porcentaje: 95 },   // S1
            { estado: 'amarillo', porcentaje: 80 }, // S2
            { estado: 'rojo', porcentaje: 65 },     // S3
            { estado: 'verde', porcentaje: 90 },    // S4
            { estado: 'verde', porcentaje: 92 }     // S5
        ];
    }

    function renderizarCalendario() {
        contenedor.innerHTML = '';

        let tarjeta = document.createElement('div');
        tarjeta.className = "proyeccionest-tarjeta";

        // Nombre del profesor
        let nombreProfesor = document.createElement('h1');
        nombreProfesor.className = "profe-nombre";
        nombreProfesor.textContent = datos.profesor;

        // Controles del mes
        let controlesMes = document.createElement('div');
        controlesMes.className = "controles-mes";

        let btnMesAnterior = document.createElement('button');
        btnMesAnterior.className = "btn-mes";
        btnMesAnterior.innerHTML = "&lt;";
        btnMesAnterior.addEventListener('click', () => {
            estado.mesActual--;
            if (estado.mesActual < 0) {
                estado.mesActual = 11;
                estado.añoActual--;
            }
            // Aquí iría la llamada a la API para obtener los nuevos datos
            renderizarCalendario();
        });

        let mesTitulo = document.createElement('h2');
        mesTitulo.className = "profe-mes";
        mesTitulo.textContent = `${nombresMeses[estado.mesActual]} ${estado.añoActual}`;

        let btnMesSiguiente = document.createElement('button');
        btnMesSiguiente.className = "btn-mes";
        btnMesSiguiente.innerHTML = "&gt;";
        btnMesSiguiente.addEventListener('click', () => {
            estado.mesActual++;
            if (estado.mesActual > 11) {
                estado.mesActual = 0;
                estado.añoActual++;
            }
            // Aquí iría la llamada a la API para obtener los nuevos datos
            renderizarCalendario();
        });

        controlesMes.appendChild(btnMesAnterior);
        controlesMes.appendChild(mesTitulo);
        controlesMes.appendChild(btnMesSiguiente);

        // Contenedor de semanas
        let semanasContainer = document.createElement('div');
        semanasContainer.className = "semanas-container";

        // Mostrar las 5 semanas (S1 a S5)
        for (let i = 0; i < 5; i++) {
            let semanaItem = document.createElement('div');
            semanaItem.className = "semana-item";

            // Etiqueta de semana (S1, S2, etc.)
            let semanaLabel = document.createElement('div');
            semanaLabel.className = "semana-label";
            semanaLabel.textContent = `S${i + 1}`;
            semanaItem.appendChild(semanaLabel);

            // Indicador de estado (cuadro de color)
            if (i < estado.datosSemanas.length) {
                let estadoSemana = document.createElement('div');
                estadoSemana.className = `estado-indicador ${estado.datosSemanas[i].estado}`;
                
                // Porcentaje (opcional)
                let porcentaje = document.createElement('div');
                porcentaje.className = "porcentaje-indicador";
                porcentaje.textContent = `${estado.datosSemanas[i].porcentaje}%`;
                estadoSemana.appendChild(porcentaje);
                
                semanaItem.appendChild(estadoSemana);
            }

            semanasContainer.appendChild(semanaItem);
        }

        // Botón de regresar
        let botonRegresar = document.createElement('button');
        botonRegresar.className = "profe-regresar";
        botonRegresar.textContent = "Regresar";
        botonRegresar.addEventListener('click', () => {
            const evento = new CustomEvent('volverGradoProfe');
            contenedor.dispatchEvent(evento);
        });

        // Botón para exportar como imagen
        let botonExportar = document.createElement('button');
        botonExportar.className = "btn-exportar";
        botonExportar.textContent = "Exportar como Imagen";
        botonExportar.addEventListener('click', exportarComoImagen);

        // Ensamblar componentes
        tarjeta.appendChild(nombreProfesor);
        tarjeta.appendChild(controlesMes);
        tarjeta.appendChild(semanasContainer);
        tarjeta.appendChild(botonExportar);
        tarjeta.appendChild(botonRegresar);
        contenedor.appendChild(tarjeta);
    }

    function exportarComoImagen() {
        // Usaremos html2canvas para exportar la tarjeta como imagen
        if (typeof html2canvas !== 'undefined') {
            html2canvas(document.querySelector('.proyeccionest-tarjeta')).then(canvas => {
                let enlace = document.createElement('a');
                enlace.download = `Asistencia-${datos.profesor}-${nombresMeses[estado.mesActual]}.png`;
                enlace.href = canvas.toDataURL('image/png');
                enlace.click();
            });
        } else {
            alert("La función de exportar requiere la librería html2canvas");
        }
    }

    // Cargar html2canvas dinámicamente
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
    script.onload = renderizarCalendario;
    document.head.appendChild(script);

    return contenedor;
}

export { proyeccionest };