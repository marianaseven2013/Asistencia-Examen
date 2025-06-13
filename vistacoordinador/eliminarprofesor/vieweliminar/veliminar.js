function crearVentanaEliminar(profesor) {
    const modal = document.createElement('div');
    modal.className = 'modal-eliminar';
    
    const contenido = document.createElement('div');
    contenido.className = 'modal-contenido';
    
    // Encabezado
    const encabezado = document.createElement('div');
    encabezado.className = 'modal-encabezado';
    
    const titulo = document.createElement('h2');
    titulo.textContent = `Forzar eliminación`;
    encabezado.appendChild(titulo);
    contenido.appendChild(encabezado);
    
    // Cuerpo
    const cuerpo = document.createElement('div');
    cuerpo.className = 'modal-cuerpo';
    
    const infoProfesor = document.createElement('div');
    infoProfesor.className = 'info-profesor';
    
    const grado = document.createElement('p');
    grado.textContent = profesor.grado;
    grado.className = 'grado';
    infoProfesor.appendChild(grado);
    
    const nombre = document.createElement('p');
    nombre.textContent = profesor.nombre;
    nombre.className = 'nombre';
    infoProfesor.appendChild(nombre);
    
    cuerpo.appendChild(infoProfesor);
    
    const advertencia = document.createElement('p');
    advertencia.textContent = "Se perderán todos los datos";
    advertencia.className = 'advertencia';
    cuerpo.appendChild(advertencia);
    
    contenido.appendChild(cuerpo);
    
    // Pie con botones
    const pie = document.createElement('div');
    pie.className = 'modal-pie';
    
    const botonConfirmar = document.createElement('button');
    botonConfirmar.textContent = 'Confirmar';
    botonConfirmar.className = 'boton-confirmar';
    botonConfirmar.addEventListener('click', () => {
        const evento = new CustomEvent('confirmarEliminacion', { bubbles: true });
        modal.dispatchEvent(evento);
    });
    
    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.className = 'boton-cancelar';
    botonCancelar.addEventListener('click', () => {
        const evento = new CustomEvent('cancelarEliminacion', { bubbles: true });
        modal.dispatchEvent(evento);
    });
    
    pie.appendChild(botonConfirmar);
    pie.appendChild(botonCancelar);
    contenido.appendChild(pie);
    
    modal.appendChild(contenido);
    
    return modal;
}

export { crearVentanaEliminar };