function crearVentanaAgregarAlumno() {
    const modal = document.createElement('div');
    modal.className = 'modal-agregar';
    
    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';
    
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = 'AGREGAR ALUMNO';
    modalContenido.appendChild(header);
    
    const form = document.createElement('div');
    form.className = 'form-container';
    
    const nombreLabel = document.createElement('label');
    nombreLabel.textContent = 'NOMBRE:';
    const nombreInput = document.createElement('input');
    nombreInput.type = 'text';
    
    const correoLabel = document.createElement('label');
    correoLabel.textContent = 'CORREO:';
    const correoInput = document.createElement('input');
    correoInput.type = 'email';
    
    form.append(nombreLabel, nombreInput, correoLabel, correoInput);
    modalContenido.appendChild(form);
    
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const btnAgregar = document.createElement('button');
    btnAgregar.className = 'btn-agregar';
    btnAgregar.textContent = 'AGREGAR';
    
    const btnCancelar = document.createElement('button');
    btnCancelar.className = 'btn-cancelar';
    btnCancelar.textContent = 'CANCELAR';
    
    // Acción al agregar
    btnAgregar.addEventListener('click', () => {
        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();

        if (!nombre || !correo) {
            alert('Por favor complete todos los campos');
            return;
        }

        // Emitir evento personalizado con los datos del alumno
        const evento = new CustomEvent('nuevoAlumno', {
            detail: {
                nombre,
                correo,
                uniforme: false,
                estado: 0
            },
            bubbles: true
        });
        modal.dispatchEvent(evento);

        document.body.removeChild(modal);
    });

    // Cancelar cierra modal
    btnCancelar.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    footer.appendChild(btnAgregar);
    footer.appendChild(btnCancelar);
    modalContenido.appendChild(footer);
    modal.appendChild(modalContenido);

    return modal;
}

export { crearVentanaAgregarAlumno };
