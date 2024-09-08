document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3003'); // Conectar con el servidor usando Socket.IO

    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();  // Prevenir la redirección predeterminada del botón

        const name = document.getElementById('name').value; // Capturar el nombre del conductor
        if (name) {
            // Emitir un evento 'conductor_login' con el nombre del conductor
            socket.emit('conductor_login', { nombre: name });

            // Guardar el nombre en localStorage
            localStorage.setItem('conductorName', name);

            // Mostrar el nombre en la consola del cliente
            console.log(`Conductor ingresó con el nombre: ${name}`);
        }
        // Redirigir a la pantalla de selección
        window.location.href = '/seleccionar/index.html';
    });
});