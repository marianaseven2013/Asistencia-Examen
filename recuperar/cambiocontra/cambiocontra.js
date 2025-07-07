import { API_URL } from "../../services/img/config.js";

function cambiocontra(callbackMostrarLogin) {
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

    botonAceptar.addEventListener('click', async () => {
        const nuevaContrasena = inputNueva.value;
        const confirmar = inputConfirmar.value;

        if (nuevaContrasena === confirmar && nuevaContrasena !== "") {
            const correo = localStorage.getItem('correoRecuperacion');
            if (!correo) {
                alert("Correo no disponible. Debes realizar primero la recuperación.");
                return;
            }

            try {
                const res = await fetch(`${API_URL}/cambiar-contrasena`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ correo, nuevaContrasena })
                });

                if (res.ok) {
                    alert("Contraseña cambiada exitosamente.");
                    callbackMostrarLogin(); // ✅ Regresa al login
                } else {
                    alert("No se pudo cambiar la contraseña. Inténtalo de nuevo.");
                }
            } catch (err) {
                alert("Error en la conexión con el servidor.");
                console.error(err);
            }
        } else {
            alert("Las contraseñas no coinciden o están vacías.");
        }
    });

    return cambioContainer;
}

export { cambiocontra };


