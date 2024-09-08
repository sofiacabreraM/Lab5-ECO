document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3003'); 
    const selectedPlate = localStorage.getItem('selectedPlate');
    const conductorName = localStorage.getItem('conductorName');

    if (selectedPlate) {
        const vehicleElement = document.getElementById('selected-plate');
        vehicleElement.textContent = selectedPlate;
    }

    document.getElementById('activar').addEventListener('click', () => {
        socket.emit('activar_vehiculo', { placa: selectedPlate, nombre: conductorName });
        console.log(`Vehículo con placa ${selectedPlate} activado.`);
    });

    document.getElementById('desactivar').addEventListener('click', () => {
        socket.emit('desactivar_vehiculo', { placa: selectedPlate, nombre: conductorName });
        console.log(`Vehículo con placa ${selectedPlate} desactivado.`);
    });

    // Manejar el evento de cambio de vista
    socket.on('cambiar_vista_nuevo_viaje', () => {
        console.log("Cambio de vista solicitado");  // Verificar que este mensaje aparece en la consola
        // Aquí rediriges la vista usando la URL correcta
        window.location.href = '/nuevoViaje';  // Redireccionar a la nueva vista
    });

    socket.on('viaje_solicitado', (data) => {
        // Manejar los detalles del viaje si es necesario en la página actual
        console.log(`Detalles del viaje recibidos: ${JSON.stringify(data)}`);
    });
});
