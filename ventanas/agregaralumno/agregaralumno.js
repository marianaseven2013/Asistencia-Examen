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
    
    footer.appendChild(btnAgregar);
    modalContenido.appendChild(footer);
    
    btnAgregar.addEventListener('click', () => {
        if (nombreInput.value.trim() === '' || correoInput.value.trim() === '') {
            alert('Por favor complete todos los campos');
            return;
        }
        alert(`Alumno ${nombreInput.value} agregado`);
        document.body.removeChild(modal);
        return {
            nombre: nombreInput.value,
            correo: correoInput.value,
            uniforme: false,
            estado: 0
        };
    });
    
    modal.appendChild(modalContenido);
    return modal;
}

export { crearVentanaAgregarAlumno };