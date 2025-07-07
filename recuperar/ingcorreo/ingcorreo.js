import { API_URL } from "../../services/img/config.js";

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
    botonSeguir.addEventListener('click', () => {
        const correo = localStorage.getItem('correoRecuperacion');
        if (correo) {
            const event = new CustomEvent('mostrarCodigo', { bubbles: true });
            document.dispatchEvent(event);
        } else {
            alert("Primero debes enviar el código al correo.");
        }
    });
    
    
    botonCancelar.addEventListener('click', () => {
        const event = new CustomEvent('mostrarLogin', { bubbles: true });
        ing_co.dispatchEvent(event);
    });


    botonEnviar.addEventListener('click', async () => {
        const correo = inputCorreo.value;
    
        if (correo) {
            try {
                const res = await fetch(`${API_URL}/enviar-codigo`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ correo })
                });
    
                if (res.ok) {
                    localStorage.setItem('correoRecuperacion', correo); // Guardamos correo
                    alert("Se ha enviado un código al correo: " + correo);
                } else {
                    alert("No se pudo enviar el código. Inténtalo más tarde.");
                }
            } catch (error) {
                console.error(error);
                alert("Error de conexión con el servidor.");
            }
        } else {
            alert("Por favor ingrese un correo válido.");
        }
    });

    return ing_co;
}

export { ingcorreo };
