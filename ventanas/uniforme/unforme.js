function crearVentanaUniforme() {
    const modal = document.createElement('div');
    modal.className = 'modal-uniforme';
    
    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';
    
    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = 'REVISIÓN DE UNIFORME';
    modalContenido.appendChild(header);
    
    // Items de uniforme
    const items = [
        { nombre: 'Polo', id: 'polo' },
        { nombre: 'Pantalon', id: 'pantalon' },
        { nombre: 'Cabello', id: 'cabello' },
        { nombre: 'Suerte/Sudadera', id: 'sudadera' },
        { nombre: 'Calcetines', id: 'calcetines' },
        { nombre: 'Zapatos', id: 'zapatos' }
    ];
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-uniforme';
        
        const nombre = document.createElement('div');
        nombre.className = 'nombre-item';
        nombre.textContent = item.nombre;
        
        const estado = document.createElement('div');
        estado.className = 'estado-item';
        
        const btnCorrecto = document.createElement('button');
        btnCorrecto.className = 'btn-estado';
        btnCorrecto.textContent = '✔';
        btnCorrecto.dataset.item = item.id;
        btnCorrecto.dataset.estado = 'correcto';
        
        const btnIncorrecto = document.createElement('button');
        btnIncorrecto.className = 'btn-estado';
        btnIncorrecto.textContent = '✘';
        btnIncorrecto.dataset.item = item.id;
        btnIncorrecto.dataset.estado = 'incorrecto';
        
        estado.append(btnCorrecto, btnIncorrecto);
        itemDiv.append(nombre, estado);
        modalContenido.appendChild(itemDiv);
        
        // Eventos para los botones de estado
        [btnCorrecto, btnIncorrecto].forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover selección de otros botones del mismo item
                const otrosBotones = estado.querySelectorAll('.btn-estado');
                otrosBotones.forEach(b => b.classList.remove('seleccionado'));
                
                // Seleccionar este botón
                this.classList.add('seleccionado');
            });
        });
    });
    
    // Observaciones
    const observaciones = document.createElement('div');
    observaciones.className = 'observaciones';
    
    const labelObs = document.createElement('div');
    labelObs.textContent = 'Observaciones';
    
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Escribe tus observaciones aquí...';
    
    observaciones.append(labelObs, textarea);
    modalContenido.appendChild(observaciones);
    
    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const btnGuardar = document.createElement('button');
    btnGuardar.className = 'btn-guardar';
    btnGuardar.textContent = 'Guardar';
    
    const btnCorreo = document.createElement('button');
    btnCorreo.className = 'btn-correo';
    btnCorreo.textContent = 'Enviar Correo';
    
    footer.append(btnGuardar, btnCorreo);
    modalContenido.appendChild(footer);
    
    // Eventos
    btnGuardar.addEventListener('click', () => {
        alert('Información de uniforme guardada');
        document.body.removeChild(modal);
    });
    
    btnCorreo.addEventListener('click', () => {
        alert('Correo enviado');
        document.body.removeChild(modal);
    });
    
    modal.appendChild(modalContenido);
    return modal;
}

export { crearVentanaUniforme };