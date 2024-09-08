document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3003'); // Asegúrate de que el puerto es correcto
    const descripcionViaje = document.getElementById('descripcionViaje');

    // Función para actualizar los detalles del viaje
    const actualizarViaje = (data) => {
        descripcionViaje.innerHTML = `
            <p>Origen: ${data.origen || 'No disponible'}</p>
            <p>Destino: ${data.destino || 'No disponible'}</p>
        `;
    };

    // Recuperar los detalles del viaje si ya están en localStorage (por si se carga manualmente)
    const viajeDetalles = localStorage.getItem('viajeDetalles');
    if (viajeDetalles) {
        const data = JSON.parse(viajeDetalles);
        actualizarViaje(data);
    } else {
        descripcionViaje.innerHTML = '<p>No se encontraron detalles del viaje.</p>';
    }

    // Escuchar cuando se solicite un nuevo viaje
    socket.on('viaje_solicitado', (data) => {
        console.log(`Detalles del nuevo viaje recibidos: ${JSON.stringify(data)}`);

        // Guardar los detalles del viaje en localStorage si es necesario
        localStorage.setItem('viajeDetalles', JSON.stringify(data));

        // Actualizar los detalles del viaje en la vista
        actualizarViaje(data);
    });
});
