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

    // Distance matrix API
    const service = new google.maps.DistanceMatrixService();

    //Selecciona el contenedor y input del autocompletado
    const pacContainer = document.getElementById('pac-container');
    const input = document.getElementById('pac-input');

    //Ubica el field del autocompletado
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(pacContainer);

    //Inicia el autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input);
    //Setteando las restricciones para resultados de busqueda solo por el centro de lima
    autocomplete.setOptions({
        bounds: {
            north: -11,
            south: -13,
            west: -78,
            east: -76
        },
        strictBounds: true
    });

    const marker = new google.maps.Marker({
        draggable: true,
        icon: './marker.png',
        map: map,
        position: {
            lat: -12.026094,
            lng: -77.061433
        }
    });

    //Define los ids de los componentes para rellenar el form
    const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name'
    };

    autocomplete.addListener('place_changed', () => {
        console.log(autocomplete.getBounds());
        marker.setVisible(false);

        const place = autocomplete.getPlace();

        // Borra los respectivos forms y los desabilita
        for(let component in componentForm) {
            if(document.getElementById(component)) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = true;
            }
        }

        // Autocomplete para cada casillero del form de la direccion
        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];
            if (componentForm[addressType] && document.getElementById(addressType)) {
                let val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }

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

    });



    google.maps.event.addListener(marker, 'dragend', () => {
        const position = marker.getPosition();
        console.log(position.lat(), position.lng());
    });

    // Muestra las coordenadas y la distancia
    const submit = document.getElementById('calcular');
    const coordinates = document.getElementById('latlng');
    const distance = document.getElementById('distance');

    const origin = {
        lat: -11.892023,
        lng: -77.044567
    }

    submit.addEventListener('click', () => {
        const destiny = {
            lat: marker.position.lat(),
            lng: marker.position.lng()
        };
        coordinates.value = destiny.lat + ' | ' + destiny.lng;
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destiny],
            travelMode: 'DRIVING'
        }, (response, status) => {
            if(status == 'OK') {
                distance.value = response.rows[0].elements[0].distance.text;
            } else {
                alert('Ha ocurrido un error, intente de nuevo!');
            }
        });
    });
}