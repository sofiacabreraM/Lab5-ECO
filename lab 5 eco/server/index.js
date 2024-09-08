const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Configuración de la aplicación Express
const app = express();

// Crear servidores HTTP para pasajeros y conductores
const serverConductor = http.createServer(app);
const serverPasajero = http.createServer(app);

// Configurar Socket.IO para cada servidor
const ioConductor = new Server(serverConductor, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const ioPasajero = new Server(serverPasajero, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Lista de conductores activados
const conductores = {};

// Configuración de sockets para conductores
ioConductor.on('connection', (socket) => {
    console.log('Conductor conectado:', socket.id);

    socket.on('activar_vehiculo', (data) => {
        conductores[socket.id] = { id: socket.id, nombre: data.nombre, placa: data.placa };
        console.log(`Conductor activado: ${data.nombre}, Placa: ${data.placa}`);
        ioPasajero.emit('vehiculo_activado', { nombre: data.nombre, placa: data.placa });
    });

    socket.on('desactivar_vehiculo', (data) => {
        if (conductores[socket.id]) {
            delete conductores[socket.id];
            console.log(`Conductor desactivado: ${data.nombre}, Placa: ${data.placa}`);
            ioPasajero.emit('vehiculo_desactivado', { placa: data.placa });
        }
    });

    socket.on('disconnect', () => {
        if (conductores[socket.id]) {
            const { nombre, placa } = conductores[socket.id];
            delete conductores[socket.id];
            console.log(`Conductor desconectado: ${nombre}, Placa: ${placa}`);
            ioPasajero.emit('vehiculo_desactivado', { placa });
        }
    });
});

// Configuración de sockets para pasajeros
ioPasajero.on('connection', (socket) => {
    console.log('Pasajero conectado:', socket.id);

    socket.on('solicitar_viaje', (data) => {
        console.log(`Solicitud de viaje recibida: ${data.origen} -> ${data.destino} para el conductor: ${data.conductor.nombre}`);
        
        const conductorSeleccionado = Object.values(conductores).find(conductor => conductor.placa === data.conductor.placa);
    
        if (conductorSeleccionado) {
            // Enviar la solicitud de viaje al conductor seleccionado
            ioConductor.to(conductorSeleccionado.id).emit('viaje_solicitado', {
                origen: data.origen,
                destino: data.destino
            });
    
            // Emitir el evento para cambiar la vista del conductor
            ioConductor.to(conductorSeleccionado.id).emit('cambiar_vista_nuevo_viaje');
            
            // Notificar al pasajero que el viaje ha sido solicitado
            socket.emit('viaje_en_progreso');
        } else {
            console.log('Conductor no encontrado');
        }
    });
    
});

// Servidores escuchando en sus respectivos puertos
serverConductor.listen(3003, () => {
    console.log('Servidor de conductores escuchando en el puerto 3003');
});

serverPasajero.listen(3002, () => {
    console.log('Servidor de pasajeros escuchando en el puerto 3002');
});
