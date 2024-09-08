document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3002');

    const btnSolicitar = document.getElementById('solicitar');
    const listaCarros = document.getElementById('listaCarros');

    let conductorSeleccionado = null;

    socket.on('vehiculo_activado', (data) => {
        const newCar = document.createElement('div');
        newCar.id = `vehiculo-${data.placa}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'radio';
        checkbox.name = 'conductorSeleccionado';
        checkbox.value = data.placa;

        checkbox.addEventListener('change', () => {
            conductorSeleccionado = {
                nombre: data.nombre,
                placa: data.placa
            };
        });

        newCar.appendChild(checkbox);
        newCar.append(`Conductor: ${data.nombre}, Placa: ${data.placa}`);
        listaCarros.appendChild(newCar);
    });

    btnSolicitar.addEventListener('click', () => {
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;

        if (origen && destino && conductorSeleccionado) {
            socket.emit('solicitar_viaje', {
                origen,
                destino,
                conductor: conductorSeleccionado
            });
        } else {
            alert('Por favor completa el origen, destino y selecciona un conductor.');
        }
    });

    socket.on('vehiculo_desactivado', (data) => {
        const vehiculoDesactivado = document.getElementById(`vehiculo-${data.placa}`);
        if (vehiculoDesactivado) {
            vehiculoDesactivado.remove();
        }
    });
});
