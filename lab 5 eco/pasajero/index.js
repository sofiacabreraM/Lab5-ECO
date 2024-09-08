document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3002'); // Conectar con el servidor usando Socket.IO

    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();  // Prevenir la redirección predeterminada del botón

        const name = document.getElementById('name').value; // Capturar el nombre del pasajero
        if (name) {
            // Emitir un evento 'pasajero_login' con el nombre del pasajero
            socket.emit('pasajero_login', { nombre: name });

            // Mostrar el nombre en la consola del cliente
            console.log(`Pasajero ingresó con el nombre: ${name}`);
        }
         // Redirigir a la pantalla principal
         window.location.href = '/pagPrincipal/index.html';
    });
})