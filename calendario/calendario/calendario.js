import { API_URL } from "../../services/img/config.js";

function calnd(nombreAlumno = "Nombre Completo", gradoId, alumnoId) {
    const cl_dar = document.createElement('div');
    cl_dar.className = "pa-calen contenedor-calendario";

    let fechaActual = new Date();
    let mes = fechaActual.getMonth();
    let anio = fechaActual.getFullYear();

    const backButton = document.createElement('button');
    backButton.textContent = 'Regresar';
    backButton.className = 'btn-regresar';
    backButton.addEventListener('click', () => {
        const event = new CustomEvent('volverAsistencia', { bubbles: true });
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
    ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(dia => {
        const th = document.createElement('th');
        th.textContent = dia;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    tabla.appendChild(tbody);

    async function renderCalendario() {
        tbody.innerHTML = '';
        const fechaInicio = new Date(anio, mes, 1);
        const primerDia = fechaInicio.getDay();
        const diasEnMes = new Date(anio, mes + 1, 0).getDate();
        mesTexto.textContent = `${fechaInicio.toLocaleString('es', { month: 'long' })} ${anio}`;

        let coloresDias = {};
        try {
            const res = await fetch(`${API_URL}/asistenciaResumenCalendario`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alumnoId, mes: mes + 1, anio })
            });
            const data = await res.json();
            console.log("🎨 Colores recibidos:", data.colores);

            if (data.ok && data.colores && typeof data.colores === 'object') {
                coloresDias = data.colores;
            } else {
                console.warn("⚠️ No se recibieron colores válidos:", data);
            }
        } catch (e) {
            console.error("❌ Error al cargar resumen de asistencia", e);
        }

        let dia = 1;
        for (let i = 0; i < 6; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');
                td.className = 'cuadro';
                if ((i === 0 && j < primerDia) || dia > diasEnMes) {
                    td.textContent = '';
                } else {
                    const fechaStr = `${anio}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
                    td.textContent = dia;
                    td.dataset.fecha = fechaStr;

                    if (coloresDias[fechaStr]) {
                        console.log(`📅 Pintando ${fechaStr} de color ${coloresDias[fechaStr]}`);
                        td.classList.add(coloresDias[fechaStr]);
                    }
                    

                    dia++;
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }

    btnUp.addEventListener('click', async () => {
        mes--;
        if (mes < 0) {
            mes = 11;
            anio--;
        }
        await renderCalendario();
    });

    btnDown.addEventListener('click', async () => {
        mes++;
        if (mes > 11) {
            mes = 0;
            anio++;
        }
        await renderCalendario();
    });

    const leyenda = document.createElement('div');
    leyenda.className = 'leyenda';
    leyenda.innerHTML = `
        <div class="caja-uniforme">Uniforme</div>
        <div class="info-leyenda">
            <span style="color:green">Verde: Asistencia</span>
            <span style="color:orange">Amarillo: Tarde</span>
            <span style="color:red">Rojo: No vino</span>
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

