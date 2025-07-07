function crearVentanaEliminar(nombreAlumno, alumnoId) {
    const modal = document.createElement('div');
    modal.className = 'modal-eliminar';

    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';

    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = `Para eliminar al alumno "${nombreAlumno}", ingrese su contraseña`;
    modalContenido.appendChild(header);

    const passInput = document.createElement('input');
    passInput.type = 'password';
    passInput.placeholder = 'Contraseña';
    passInput.className = 'password-input';
    modalContenido.appendChild(passInput);

    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    const btnConfirmar = document.createElement('button');
    btnConfirmar.textContent = 'Confirmar';
    footer.appendChild(btnConfirmar);
    modalContenido.appendChild(footer);
    modal.appendChild(modalContenido);

    btnConfirmar.addEventListener('click', () => {
        const contrasena = passInput.value.trim();
        if (!contrasena) return alert('Ingrese su contraseña');

        const evento = new CustomEvent('confirmacion', {
            detail: {
                confirmado: true,
                contrasena,
                alumnoId
            },
            bubbles: true
        });
        modal.dispatchEvent(evento);
        document.body.removeChild(modal);
    });

    return modal;
}

export { crearVentanaEliminar };
