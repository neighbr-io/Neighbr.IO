let mapOptions = {
    center:[30.2708, -97.7438],
    zoom:11
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);


let locations = [
    {
        "id": 1,
        "lat": 30.2611330,
        "long": -97.6978681,
        "src": '../images/1.gif',
        "title": "OMG Squee!",
        "url": "https://www.squeeclub.com/"
    },
    {
        "id": 2,
        "lat": 30.358528,
        "long": -97.730745,
        "src": '../images/2.png',
        "title": "DeSano Pizzeria",
        "url":"https://desanopizza.com/"
    },
    {
        "id": 3,
        "lat": 30.140125,
        "long": -97.832975,
        "src": '../images/3.png',
        "title": "Mi Ranchito",
        "url":"https://miranchitoatx.com/"
    },
    {
        "id": 4,
        "lat": 30.2596649,
        "long": -97.7548076,
        "src": '../images/4.png',
        "title": "Terry Black's BBQ",
        "url":"https://terryblacksbbq.com/"
    }
]

let popupOption = {
    "closeButton":false
}

locations.forEach(element => {
    new L.Marker([element.lat,element.long]).addTo(map)
    .on("mouseover",event =>{
        event.target.bindPopup('<div class="card"><img src="'+element.src+'" width="80" height="80" alt="'+element.title+'"><h3>'+element.title+'</h3></div>',popupOption).openPopup();
    })
    .on("mouseout", event => {
        event.target.closePopup();
    })
    .on("click" , () => {
        window.open(element.url);
    })
});


