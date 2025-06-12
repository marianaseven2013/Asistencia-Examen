function crearVentanaCorreoAlumno(nombreAlumno) {
    const modal = document.createElement('div');
    modal.className = 'modal-correo-individual';
    
    const modalContenido = document.createElement('div');
    modalContenido.className = 'modal-contenido';
    
    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = `Redactar Correo para ${nombreAlumno}`;
    modalContenido.appendChild(header);
    
    // Área de texto
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Escribe tu mensaje aquí...';
    textarea.className = 'correo-textarea';
    modalContenido.appendChild(textarea);
    
    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const btnEnviar = document.createElement('button');
    btnEnviar.className = 'btn-enviar';
    btnEnviar.textContent = 'Enviar correo';
    
    footer.appendChild(btnEnviar);
    modalContenido.appendChild(footer);
    
    // Eventos
    btnEnviar.addEventListener('click', () => {
        alert(`Correo enviado a ${nombreAlumno}`);
        document.body.removeChild(modal);
    });
    
    modal.appendChild(modalContenido);
    return modal;
}

export { crearVentanaCorreoAlumno };