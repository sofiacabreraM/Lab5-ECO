// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const PORT = 3000;

// // Middleware para procesar JSON
// app.use(express.json());

// // Servir archivos estáticos (cliente)
// app.use(express.static('public'));

// // Endpoints de API
// app.get('/api/data', (req, res) => {
//     res.json({ message: 'Datos obtenidos con GET' });
// });

// app.post('/api/data', (req, res) => {
//     const newData = req.body;
//     res.json({ message: 'Datos recibidos con POST', data: newData });
// });

// // Configuración de Socket.IO
// const server = http.createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log(`Cliente conectado con ID: ${socket.id}`);

//     // Enviar un mensaje privado al cliente que se conecta
//     socket.emit('privateMessage', `Hola cliente con ID ${socket.id}`);

//     // Escuchar mensajes del cliente
//     socket.on('mensajePrivado', (data) => {
//         console.log(`Mensaje privado recibido de ${socket.id}: ${data}`);
//         // Responder solo al cliente que envió el mensaje
//         socket.emit('respuestaPrivada', `Respuesta solo para ti, cliente ${socket.id}`);
//     });

//     // Desconexión del cliente
//     socket.on('disconnect', () => {
//         console.log(`Cliente con ID ${socket.id} se ha desconectado`);
//     });
// });

// // Iniciar el servidor
// server.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

// Conectar con el servidor Socket.IO






// const socket = io('http://localhost:3000');

// // Escuchar mensajes privados del servidor
// socket.on('privateMessage', (mensaje) => {
//     console.log('Mensaje privado del servidor:', mensaje);
// });

// // Enviar mensaje privado al servidor
// document.getElementById('sendPrivateMessage').addEventListener('click', () => {
//     socket.emit('mensajePrivado', 'Este es un mensaje privado desde el cliente');
// });

// // Escuchar la respuesta privada del servidor
// socket.on('respuestaPrivada', (mensaje) => {
//     console.log('Respuesta privada del servidor:', mensaje);
// });

// // Llamar al endpoint GET
// document.getElementById('fetchData').addEventListener('click', () => {
//     fetch('/api/data')
//         .then(response => response.json())
//         .then(data => {
//             console.log('Respuesta del servidor (GET):', data);
//         });
// });

// // Llamar al endpoint POST
// document.getElementById('postData').addEventListener('click', () => {
//     fetch('/api/data', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: 'Nuevo Dato desde Cliente' })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Respuesta del servidor (POST):', data);
//     });
// });
