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

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: false
    });
    //drawingManager.setMap(map);

    /*
    google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
        //Devuelve un marker
    });
    */

    const marker1 = new google.maps.Marker({
        draggable: true,
        icon: './marker.png',
        map: map,
        position: {
            lat: -12.026094,
            lng: -77.061433
        }
    });

    const geocoder = new google.maps.Geocoder;
    /*
    geocoder.geocode({
        location: {
            lat: -12.026094,
            lng: -77.061433
        }
    });
    */

    /*
    google.maps.event.addListener(marker1, 'dragend', () => {
        const position = marker1.getPosition();
        console.log(position.lat(), position.lng());
    });
    */

}