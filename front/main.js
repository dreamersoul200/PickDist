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

    //Activa el drawing para que el usuario dibuje un marcador
    /*
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: false
    });
    drawingManager.setMap(map);
    */

    /*
    google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
        //Devuelve un marker
    });
    */

    //Selecciona el contenedor y input del autocompletado
    const pacContainer = document.getElementById('pac-container');
    const input = document.getElementById('pac-input');

    //Ubica el field del autocompletado
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(pacContainer);

    //Inicia el autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input);

    const marker = new google.maps.Marker({
        draggable: true,
        icon: './marker.png',
        map: map,
        position: {
            lat: -12.026094,
            lng: -77.061433
        }
    });

    autocomplete.addListener('place_changed', () => {
        marker.setVisible(false);

        const place = autocomplete.getPlace();

        if(!place.geometry) {
            window.alert('Fallo en el request o la direccion no es valida!');
            return;
        }

        if(place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        // Imprime el lugar
        console.log(place.geometry.location.lat());
    });



    google.maps.event.addListener(marker, 'dragend', () => {
        const position = marker.getPosition();
        console.log(position.lat(), position.lng());
    });

}