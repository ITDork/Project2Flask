
var mymap = L.map('mapid').setView([38.9822, -94.6708], 6);

var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
}).addTo(mymap)

// var sirendata;
d3.json("/datasets/SirensDictionaries.json").then(function (sirendata) {
    // sirendata = data;
    let markers2 = L.markerClusterGroup();

    sirendata[0].Folder.Placemark.forEach(row => {
        if ("Point" in row) {
            var coord = row.Point.coordinates.split(",");
            markers2.addLayer(L.marker([parseFloat(coord[1]), parseFloat(coord[0])]));
        }
        if ("Polygon" in row) {
            row.Polygon.outerBoundaryIs.LinearRing.coordinates.split("\n").forEach(
                thing => {
                    var coord3 = thing.split(",");
                    markers2.addLayer(L.marker([parseFloat(coord3[1]), parseFloat(coord3[0])]));
                }
            );

        }
    });
    mymap.addLayer(markers2);
});


// // var sirendata;
// d3.json("/datasets/SirensDictionaries.json").then(function (sirendata2) {
//     // sirendata = data;
//     let markers2 = L.markerClusterGroup();

//     sirendata2[0].Folder.Placemark.forEach(row => {
//         if ("Polygon" in row) {
//             row.Polygon.outerBoundaryIs.LinearRing.coordinates.split("\n").forEach(
//                 thing => {
//                     var coord3 = thing.split(",");
//                     markers2.addLayer(L.marker([parseFloat(coord3[1]), parseFloat(coord3[0])]));
//                 }
//             );

//         }
//     });
//     mymap.addLayer(markers2);
// });
