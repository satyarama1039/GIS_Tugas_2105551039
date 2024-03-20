var map = L.map('map').setView([-8.8008012, 115.1612023], 20);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.getCurrentPosition(position => {
    const { coords: { latitude, longitude }} = position;
    var marker = new L.marker([latitude, longitude], {
    draggable: false,
    autoPan: true
    }).addTo(map);

    map.setView([latitude, longitude], 20);

    var myIcon = L.icon({
        iconUrl: 'icon.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    marker.bindPopup("<b>Hello, you're here!").openPopup();
    console.log(marker);
})

var popup = L.popup()
    .setLatLng([-8.8008012, 115.1612023])
    .setContent("I am a standalone popup.")
    .openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

var circle = L.circle([-8.255917, 115.190258], {
    color: 'yellow',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle.bindPopup("Gunung pernah aktif");

var locations = [
    {lat: -8.25889, lng: 115.409467, name: 'Danau Batur'},
    {lat: -8.27299, lng: 115.175547, name: 'Danau Beratan'},
    {lat: -8.257446, lng: 115.096997, name: 'Danau Tamblingan'},
    {lat: -8.245129, lng: 115.122978, name: 'Danau Buyan'}
];

locations.forEach(location => {
    var marker = L.marker([location.lat, location.lng]).addTo(map);
    marker.bindPopup(location.name).openPopup();;
});