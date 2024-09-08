document.addEventListener('DOMContentLoaded', () => {
    const siguienteButton = document.getElementById('siguiente');

    siguienteButton.addEventListener('click', () => {
        // Obtener la placa seleccionada
        const selectedVehicle = document.querySelector('input[name="vehicle"]:checked');

        if (selectedVehicle) {
            const vehiclePlate = selectedVehicle.value;

            // Guardar la placa seleccionada en localStorage
            localStorage.setItem('selectedPlate', vehiclePlate);

            // Redirigir a la siguiente vista (pantalla "seleccionado")
            window.location.href = '/seleccionado'; // Cambiar por la ruta correcta
        } else {
            alert('Por favor selecciona un vehículo');
        }
    });
});

