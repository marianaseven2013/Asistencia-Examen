function h_login(onLogin) {
    let login_n = document.createElement('div');
    login_n.className = "loogin";

    let pa_lo = document.createElement('div');
    pa_lo.className = "cuadro-logo";
    login_n.appendChild(pa_lo);

    let titulowl  = document.createElement('div');
    titulowl.className = "titulo";
    pa_lo.appendChild(titulowl);

    let titulogo  = document.createElement('h1');
    titulogo.innerText = "Bienvenido a tu asistencia SCL";
    titulowl.appendChild(titulogo);

    let logoig  = document.createElement('div');
    logoig.className = "igglogo";
    pa_lo.appendChild(logoig);

    let login_form = document.createElement('div');
    login_form.className = "login-form"; 
    login_n.appendChild(login_form); 

    let inputEmail = document.createElement('input');
    inputEmail.type = "email";
    inputEmail.placeholder = "Correo electrónico";
    inputEmail.className = "email-input";
    login_form.appendChild(inputEmail);

    let inputPassword = document.createElement('input');
    inputPassword.type = "password";
    inputPassword.placeholder = "Contraseña";
    inputPassword.className = "contra-input";
    login_form.appendChild(inputPassword);

    let loginButton = document.createElement('button');
    loginButton.innerText = "Iniciar sesión";
    loginButton.className = "btn-login";
    login_form.appendChild(loginButton);

    let forgotPassword = document.createElement('p');
    forgotPassword.className = "forgot-password";
    forgotPassword.innerHTML = `<a href="#" id="recuperar-link">Recuperar contraseña</a>`;
    login_form.appendChild(forgotPassword);

    loginButton.addEventListener('click', async () => {
        const email = inputEmail.value;
        const password = inputPassword.value;

        try {
            const respuesta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: email, password: password }) // <- corregido aquí
            });
        
            const data = await respuesta.json();
        
            if (respuesta.ok) {
                onLogin(email, data.rol);
            } else {
                alert(data.mensaje || 'Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Ocurrió un error al conectar con el servidor');
        }
        
    });

    // Evento para abrir recuperación
    forgotPassword.querySelector('#recuperar-link').addEventListener('click', (e) => {
        e.preventDefault();
        const event = new CustomEvent('mostrarRecuperacion', { bubbles: true });
        login_n.dispatchEvent(event);
    });

    return login_n;
}

// Este callback será invocado desde index.js
function onLogin(correo, rol) {
    console.log('Usuario:', correo);
    console.log('Rol:', rol);

    const evento = new CustomEvent('rolDetectado', {
        detail: { correo, rol }
    });


    document.dispatchEvent(evento);
}

export { h_login, onLogin };


