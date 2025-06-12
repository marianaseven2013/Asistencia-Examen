function cambiocontra() {
    let cambioContainer = document.createElement('div');
    cambioContainer.className = "cambiocontra";

    let cuadroCambio = document.createElement('div');
    cuadroCambio.className = "cuadro-cambio";
    cambioContainer.appendChild(cuadroCambio);

    let titulo = document.createElement('div');
    titulo.className = "titulo-cambio";
    titulo.innerText = "Cambio de Contraseña";
    cuadroCambio.appendChild(titulo);

    let inputNueva = document.createElement('input');
    inputNueva.type = "password";
    inputNueva.placeholder = "Nueva contraseña";
    inputNueva.className = "input-password";
    cuadroCambio.appendChild(inputNueva);

    let inputConfirmar = document.createElement('input');
    inputConfirmar.type = "password";
    inputConfirmar.placeholder = "Confirmar contraseña";
    inputConfirmar.className = "input-password";
    cuadroCambio.appendChild(inputConfirmar);

    let botonAceptar = document.createElement('button');
    botonAceptar.className = "btn-aceptar";
    botonAceptar.innerText = "Aceptar";
    cuadroCambio.appendChild(botonAceptar);

    botonAceptar.addEventListener('click', () => {
        if (inputNueva.value === inputConfirmar.value && inputNueva.value !== "") {
            alert("Contraseña cambiada exitosamente.");
            const event = new CustomEvent('mostrarLogin', { bubbles: true });
            cambioContainer.dispatchEvent(event);
        } else {
            alert("Las contraseñas no coinciden o están vacías.");
        }
    });

    return cambioContainer;
}

export { cambiocontra };
