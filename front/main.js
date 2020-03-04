let map;

function initMap() {
    // Inicia un mapa centrado en lima con la configuracion por defecto
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -12.026094,
            lng: -77.061433
        },
        // Desabilita la opcion de pantalla completa
        fullscreenControl: false,
        restriction: {
            //Setea los limites dentro de lima aproximadamente
            latLngBounds: {
                north: -11,
                south: -13,
                west: -78,
                east: -76
            },
            strictBounds: true
        },
        zoom: 15
    });
}