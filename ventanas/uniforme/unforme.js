function crearVentanaUniforme(alumno) {
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
      { nombre: 'Pantalón', id: 'pantalon' },
      { nombre: 'Cabello', id: 'cabello' },
      { nombre: 'Suéter/Sudadera', id: 'sueter_sudadera' },
      { nombre: 'Calcetines', id: 'calsetines' },
      { nombre: 'Zapatos', id: 'zapatos' }
    ];
  
    const estadoUniforme = {};
  
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item-uniforme';
  
      const nombreItem = document.createElement('div');
      nombreItem.className = 'nombre-item';
      nombreItem.textContent = item.nombre;
  
      const estadoDiv = document.createElement('div');
      estadoDiv.className = 'estado-item';
  
      const btnCorrecto = document.createElement('button');
      btnCorrecto.className = 'btn-estado';
      btnCorrecto.textContent = '✔';
      btnCorrecto.addEventListener('click', () => {
        estadoUniforme[item.id] = 1;
        btnCorrecto.classList.add('seleccionado');
        btnIncorrecto.classList.remove('seleccionado');
      });
  
      const btnIncorrecto = document.createElement('button');
      btnIncorrecto.className = 'btn-estado';
      btnIncorrecto.textContent = '✘';
      btnIncorrecto.addEventListener('click', () => {
        estadoUniforme[item.id] = 0;
        btnIncorrecto.classList.add('seleccionado');
        btnCorrecto.classList.remove('seleccionado');
      });
  
      estadoDiv.append(btnCorrecto, btnIncorrecto);
      itemDiv.append(nombreItem, estadoDiv);
      modalContenido.appendChild(itemDiv);
    });
  
    // Observaciones
    const observacionesDiv = document.createElement('div');
    observacionesDiv.className = 'observaciones';
  
    const labelObs = document.createElement('div');
    labelObs.textContent = 'Observaciones';
  
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Escribe tus observaciones aquí...';
  
    observacionesDiv.append(labelObs, textarea);
    modalContenido.appendChild(observacionesDiv);
  
    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
  
    const btnGuardar = document.createElement('button');
    btnGuardar.className = 'btn-guardar';
    btnGuardar.textContent = 'Guardar';
  
    btnGuardar.addEventListener('click', () => {
      const datos = {
        ...estadoUniforme,
        observaciones: textarea.value.trim(),
        alumnos_id: alumno.id
      };
  
      fetch('http://localhost:3000/guardarUniforme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            alumno.uniforme_id = data.uniforme_id;
            alert('Información de uniforme guardada');
          } else {
            alert('Error al guardar uniforme');
          }
          document.body.removeChild(modal);
        })
        .catch(err => {
          console.error('Error al guardar uniforme:', err);
          alert('Error en la conexión al guardar');
          document.body.removeChild(modal);
        });
    });
  
    footer.append(btnGuardar);
    modalContenido.appendChild(footer);
    modal.appendChild(modalContenido);
  
    return modal;
  }
  
  export { crearVentanaUniforme };
