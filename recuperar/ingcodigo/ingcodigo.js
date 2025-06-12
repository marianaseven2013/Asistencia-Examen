function ingcodigo() {
    let ing_cod = document.createElement('div');
    ing_cod.className = "ingcodigo";

    let cuadrocod = document.createElement('div');
    cuadrocod.className = "cuadro-codigo";
    ing_cod.appendChild(cuadrocod);

    let titulo = document.createElement('div');
    titulo.className = "titulo-codigo";
    titulo.innerText = "Ingrese el Código de Verificación";
    cuadrocod.appendChild(titulo);

    let instruccion = document.createElement('div');
    instruccion.className = "instruccion";
    instruccion.innerText = "Por favor, ingrese el código enviado a su correo electrónico:";
    cuadrocod.appendChild(instruccion);

    let inputCodigo = document.createElement('input');
    inputCodigo.type = "text";
    inputCodigo.placeholder = "Código de verificación";
    inputCodigo.className = "input-codigo";
    cuadrocod.appendChild(inputCodigo);

    let botonEnviar = document.createElement('button');
    botonEnviar.className = "btn-enviar";
    botonEnviar.innerText = "Enviar";
    cuadrocod.appendChild(botonEnviar);

    let botonRegresar = document.createElement('button');
    botonRegresar.className = "btn-regresar";
    botonRegresar.innerText = "Regresar";
    cuadrocod.appendChild(botonRegresar);

    let botonSeguir = document.createElement('button');
    botonSeguir.className = "btn-seguir";
    botonSeguir.innerText = "Seguir";
    cuadrocod.appendChild(botonSeguir);

    botonRegresar.addEventListener('click', () => {
        const event = new CustomEvent('mostrarCorreo', { bubbles: true });
        ing_cod.dispatchEvent(event);
    });

    botonEnviar.addEventListener('click', () => {
        const codigo = inputCodigo.value;
        if(codigo){
            alert("Código enviado: " + codigo);
        } else {
            alert("Por favor ingrese el código.");
        }
    });

    botonSeguir.addEventListener('click', () => {
        const event = new CustomEvent('mostrarCambioContra', { bubbles: true });
        ing_cod.dispatchEvent(event);
    });

    return ing_cod;
}

export { ingcodigo };
