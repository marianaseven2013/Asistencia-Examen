import { API_URL } from "../../services/img/config.js";

function crearVentanaCorreoAlumno(nombreAlumno, correoAlumno) {
    const modal = document.createElement('div');
    modal.className = 'modal-correo-individual';

    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = `Redactar Correo para ${nombreAlumno}`;
    modalContenido.appendChild(header);

    // Campo asunto
    const inputAsunto = document.createElement('input');
    inputAsunto.type = 'text';
    inputAsunto.placeholder = 'Asunto del correo';
    inputAsunto.className = 'correo-asunto';
    modalContenido.appendChild(inputAsunto);

    // Área de texto para mensaje
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Escribe tu mensaje aquí...';
    textarea.className = 'correo-textarea';
    modalContenido.appendChild(textarea);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    const btnCancelar = document.createElement('button');
    btnCancelar.className = 'btn-cancelar';
    btnCancelar.textContent = 'Cancelar';

    const btnEnviar = document.createElement('button');
    btnEnviar.className = 'btn-enviar';
    btnEnviar.textContent = 'Enviar correo';

    footer.appendChild(btnCancelar);
    footer.appendChild(btnEnviar);
    modalContenido.appendChild(footer);

    // Evento cancelar
    btnCancelar.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Evento enviar correo
    btnEnviar.addEventListener('click', () => {
        const asunto = inputAsunto.value.trim();
        const mensaje = textarea.value.trim();

        

        if (!asunto || !mensaje) {
            alert("Debes completar el asunto y el mensaje.");
            return;
        }
        console.log({
            para: correoAlumno,
            asunto: inputAsunto.value.trim(),
            mensaje: textarea.value.trim()
          });
          

        fetch(`${API_URL}/enviarCorreoAlumno`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                para: correoAlumno,
                asunto: asunto,
                mensaje: mensaje
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                alert(`Correo enviado correctamente a ${correoAlumno}`);
                document.body.removeChild(modal);
            } else {
                alert('Hubo un problema al enviar el correo.');
            }
        })
        .catch(err => {
            console.error('Error al enviar correo:', err);
            alert('Error en el servidor al enviar el correo.');
        });
    });

    modal.appendChild(modalContenido);
    return modal;
}

export { crearVentanaCorreoAlumno };
