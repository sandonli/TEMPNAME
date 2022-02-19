let directionsService;

function initMap() {
    let options = {
        zoom: 8,
        center: {lat: 41.3601, lng: -71.0589}
    }

    let map = new google.maps.Map(document.getElementById("map"), options);
    let marker = new google.maps.Marker({position: options.center, map:map});
}