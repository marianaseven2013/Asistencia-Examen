function crearVentanaEliminar(nombreAlumno) {
    const modal = document.createElement('div');
    modal.className = 'modal-eliminar';
    
    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';
    
    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = `Para la eliminación del alumno, ingrese SU contraseña`;
    modalContenido.appendChild(header);
    
    // Campo de contraseña
    const passInput = document.createElement('input');
    passInput.type = 'password';
    passInput.placeholder = 'Ingrese Contraseña';
    passInput.className = 'password-input';
    modalContenido.appendChild(passInput);
    
    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const btnConfirmar = document.createElement('button');
    btnConfirmar.className = 'btn-confirmar';
    btnConfirmar.textContent = 'Confirmar Eliminación';
    
    footer.appendChild(btnConfirmar);
    modalContenido.appendChild(footer);
    
    // Eventos
    btnConfirmar.addEventListener('click', () => {
        if (passInput.value.trim() === '') {
            alert('Por favor ingrese su contraseña');
            return;
        }
        alert(`Alumno "${nombreAlumno}" eliminado`);
        document.body.removeChild(modal);
        return true;
    });
    
    modal.appendChild(modalContenido);
    return modal;
}

export { crearVentanaEliminar };