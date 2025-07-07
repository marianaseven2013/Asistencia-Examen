import { API_URL } from "../../services/img/config.js";

function crearVentanaRedactarCorreo(listaCorreos = []) {
    const modal = document.createElement('div');
    modal.className = 'modal-correo';

    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = 'Redactar Correo para Todos los alumnos';
    modalContenido.appendChild(header);

    // Campo asunto
    const inputAsunto = document.createElement('input');
    inputAsunto.type = 'text';
    inputAsunto.placeholder = 'Asunto del correo';
    inputAsunto.className = 'correo-asunto';
    modalContenido.appendChild(inputAsunto);

    // Área de texto
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
    btnCancelar.addEventListener('click', () => document.body.removeChild(modal));

    const btnEnviar = document.createElement('button');
    btnEnviar.className = 'btn-enviar';
    btnEnviar.textContent = 'Enviar a todos';

    footer.appendChild(btnCancelar);
    footer.appendChild(btnEnviar);
    modalContenido.appendChild(footer);

    btnEnviar.addEventListener('click', () => {
        const asunto = inputAsunto.value.trim();
        const mensaje = textarea.value.trim();

        if (!asunto || !mensaje) {
            alert("Debes completar el asunto y el mensaje.");
            return;
        }

        fetch(`${API_URL}/enviarCorreoTodos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                destinatarios: listaCorreos,
                asunto,
                mensaje
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                alert("Correo enviado a todos los alumnos.");
                document.body.removeChild(modal);
            } else {
                alert("Hubo un error al enviar el correo.");
            }
        })
        .catch(err => {
            console.error('Error al enviar correos:', err);
            alert("Error del servidor.");
        });
    });

    modal.appendChild(modalContenido);
    return modal;
}

export { crearVentanaRedactarCorreo };
