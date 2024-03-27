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

const firebaseConfig = {
    apiKey: "AIzaSyC8h1mCA5uLatlNevamS2sfUiNJ0_yZG5w",
    authDomain: "fitness-8d36a.firebaseapp.com",
    databaseURL: "https://fitness-8d36a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fitness-8d36a",
    storageBucket: "fitness-8d36a.appspot.com",
    messagingSenderId: "992203504745",
    appId: "1:992203504745:web:88bc0c79d254685dd776f8",
    measurementId: "G-EP44RZBSK3"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

database.ref("fitness_database").on("value", getData);

function getData(snapshoot) {
    snapshoot.forEach((element) => {
        var data = element.val();

        var marker = L.marker([data.latitude, data.longitude]).addTo(map);
        marker.bindPopup(data.name).openPopup();;

        // Function to show the overlay
        function showOverlay() {
            document.getElementById('image').src = data.photo;
            document.getElementById('title').textContent = data.name;
            document.getElementById('description').textContent = data.alamat;
            document.getElementById('overlay').style.display = 'block';
        }

        // Function to hide the overlay
        function hideOverlay() {
            document.getElementById('overlay').style.display = 'none';
        }

        // Add a click event listener to the marker
        marker.on('click', function() {
            showOverlay();
        });

        // Close the overlay when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target == document.getElementById('overlay')) {
                hideOverlay();
            }
        });
    });
}
