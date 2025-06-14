function calnd(nombreAlumno = "Nombre Completo") {
    const cl_dar = document.createElement('div');
    cl_dar.className = "pa-calen";

    let fechaActual = new Date();
    let mes = fechaActual.getMonth();
    let anio = fechaActual.getFullYear();

    const backButton = document.createElement('button');
    backButton.textContent = 'Regresar';
    backButton.className = 'btn-regresar';
    backButton.addEventListener('click', () => {
        const event = new CustomEvent('volverAsistencia', {
            bubbles: true,
            composed: true
        });
        cl_dar.dispatchEvent(event);
    });

    const nombre = document.createElement('h2');
    nombre.textContent = nombreAlumno;
    nombre.className = 'titulo-nombre';

    const mesContainer = document.createElement('div');
    mesContainer.className = 'mes-container';

    const btnUp = document.createElement('button');
    btnUp.textContent = '^';
    btnUp.className = 'mes-btn';

    const btnDown = document.createElement('button');
    btnDown.textContent = 'v';
    btnDown.className = 'mes-btn';

    const mesTexto = document.createElement('span');
    mesTexto.className = 'mes-text';

    mesContainer.appendChild(btnUp);
    mesContainer.appendChild(mesTexto);
    mesContainer.appendChild(btnDown);

    const tabla = document.createElement('table');
    tabla.className = 'tabla-calendario';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(s => {
        const th = document.createElement('th');
        th.textContent = s;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    tabla.appendChild(tbody);

    function renderCalendario() {
        tbody.innerHTML = '';

        const fechaInicio = new Date(anio, mes, 1);
        const primerDia = fechaInicio.getDay();
        const diasEnMes = new Date(anio, mes + 1, 0).getDate();

        mesTexto.textContent = `${fechaInicio.toLocaleString('es', { month: 'long' })} ${anio}`;

        let dia = 1;
        for (let i = 0; i < 6; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');
                td.className = 'cuadro';

                if ((i === 0 && j < primerDia) || dia > diasEnMes) {
                    td.textContent = '';
                } else {
                    td.textContent = dia;
                    td.dataset.fecha = `${anio}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
                    td.addEventListener('click', () => {
                        td.classList.toggle('activo');
                    });
                    dia++;
                }

                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }

    btnUp.addEventListener('click', () => {
        mes--;
        if (mes < 0) {
            mes = 11;
            anio--;
        }
        renderCalendario();
    });

    btnDown.addEventListener('click', () => {
        mes++;
        if (mes > 11) {
            mes = 0;
            anio++;
        }
        renderCalendario();
    });

    const leyenda = document.createElement('div');
    leyenda.className = 'leyenda';
    leyenda.innerHTML = `
        <div class="caja-uniforme">Uniforme</div>
        <div class="info-leyenda">
            <span>fecha</span>
            <span>uniforme incompleto</span>
        </div>
    `;

    const descargar = document.createElement('button');
    descargar.textContent = "Descargar img";
    descargar.className = "descargar-img";

    cl_dar.appendChild(backButton);
    cl_dar.appendChild(nombre);
    cl_dar.appendChild(mesContainer);
    cl_dar.appendChild(tabla);
    cl_dar.appendChild(leyenda);
    cl_dar.appendChild(descargar);

    renderCalendario();
    return cl_dar;
}

export { calnd };