function ingcorreo() {
    let ing_co = document.createElement('div');
    ing_co.className = "ingcorreo";

    let cuadrorec = document.createElement('div');
    cuadrorec.className = "cuadro-recuperacion";
    ing_co.appendChild(cuadrorec);

    let titulo = document.createElement('div');
    titulo.className = "titulo-recuperacion";
    titulo.innerText = "Recuperación de Contraseña";
    cuadrorec.appendChild(titulo);

    let instruccion = document.createElement('div');
    instruccion.className = "instruccion";
    instruccion.innerText = "Por favor, ingrese su correo electrónico registrado:";
    cuadrorec.appendChild(instruccion);

    let inputCorreo = document.createElement('input');
    inputCorreo.type = "email";
    inputCorreo.placeholder = "Correo electrónico";
    inputCorreo.className = "input-correo";
    cuadrorec.appendChild(inputCorreo);

    let botonEnviar = document.createElement('button');
    botonEnviar.className = "btn-enviar";
    botonEnviar.innerText = "Enviar código";
    cuadrorec.appendChild(botonEnviar);

    let botonCancelar = document.createElement('button');
    botonCancelar.className = "btn-cancelar";
    botonCancelar.innerText = "Cancelar";
    cuadrorec.appendChild(botonCancelar);

    let botonSeguir = document.createElement('button');
    botonSeguir.className = "btn-seguir";
    botonSeguir.innerText = "Seguir";
    cuadrorec.appendChild(botonSeguir);

    botonCancelar.addEventListener('click', () => {
        const event = new CustomEvent('mostrarLogin', { bubbles: true });
        ing_co.dispatchEvent(event);
    });

    botonEnviar.addEventListener('click', () => {
        const correo = inputCorreo.value;
        if(correo){
            alert("Se ha enviado un código al correo: " + correo);
        } else {
            alert("Por favor ingrese un correo válido.");
        }
    });

    botonSeguir.addEventListener('click', () => {
        const event = new CustomEvent('mostrarCodigo', { bubbles: true });
        ing_co.dispatchEvent(event);
    });

    return ing_co;
}

export { ingcorreo };
