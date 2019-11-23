
var mymap = L.map('mapid').setView([35.4676, -97.5164], 6);

var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
}).addTo(mymap)

var mapMarkers = []
// console.log(TYear)
// var baseMaps = {
//     "Streets": streets
// };

// var overlayMaps = {
//     "States": states
// };

// L.control.layers(baseMaps, overlayMaps).addTo(tmap);

// var outdoor = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     maxZoom: 18,
//     id: "mapbox.outdoors",
//     accessToken: API_KEY
//   }).addTo(mymap);
// function handleSearchButtonClick(){
// $searchBtn.addEventListener("click", handleSearchButtonClick);
// var TYear = d3.select($userinput).value.trim();
// TYear.attr("placeholder");
// TYear.value='';

/* <input id="data" size="30">
<button id="btn">Click me</button>
<div id="display"></div>

<script src="get_value_of_input_box.js"></script>

"use strict";

function clicked() {
    var input_value = document.getElementById('data').value;
    document.getElementById('display').innerHTML = input_value;
}

document.getElementById('btn').addEventListener('click', clicked);; */
document.getElementById("plot").addEventListener("click", clicked);;
function clicked() {
  var inputvalue = document.getElementById("userinput").value;
  document.getElementById("display").innerHTML = inputvalue;
  console.log(inputvalue);

d3.json("/datasets/mapdata.json").then (function (data) {
    console.log(data[0]);

    var tdata = data.filter(function (y){
        return y.Year === inputvalue;
      });
      for (var i = 0; i < this.mapMarkers.length; i++){
        this.mymap.removeLayer(this.mapMarkers[i]);
      };

    console.error(tdata[0]);
    for (var i = 0; i < tdata.length; ++i) {
        let width = tdata[i].Width;
        var markers = L.circle([tdata[i].TouchdownLat, tdata[i].TouchdownLon],
          {color: "blue",
          fillcolor: "lightblue",
          fillOpacity: 0.50,
          radius: width * 30})
          .bindPopup("On " + tdata[i].Date + " an F" + tdata[i].Fujita +  " Tornado <br>" + tdata[i].Width + " yards wide, caused <br>" + tdata[i].Damage + " in damages.")
          .addTo(mymap);
            this.mapMarkers.push(markers)};
            
  });
};


/* <script>

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([2, 47])                // GPS of location to zoom on
    .scale(1020)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// Create data for circles:
var markers = [
  {long: 9.083, lat: 42.149, group: "A", size: 34}, // corsica
  {long: 7.26, lat: 43.71, group: "A", size: 14}, // nice
  {long: 2.349, lat: 48.864, group: "B", size: 87}, // Paris
  {long: -1.397, lat: 43.664, group: "B", size: 41}, // Hossegor
  {long: 3.075, lat: 50.640, group: "C", size: 78}, // Lille
  {long: -3.83, lat: 48, group: "C", size: 12} // Morlaix
];

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    // Filter data
    data.features = data.features.filter( function(d){return d.properties.name=="France"} )

    // Create a color scale
    var color = d3.scaleOrdinal()
      .domain(["A", "B", "C" ])
      .range([ "#402D54", "#D18975", "#8FD175"])

    // Add a scale for bubble size
    var size = d3.scaleLinear()
      .domain([1,100])  // What's in the data
      .range([ 4, 50])  // Size in pixel

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("opacity", .3)

    // Add circles:
    svg
      .selectAll("myCircles")
      .data(markers)
      .enter()
      .append("circle")
        .attr("class" , function(d){ return d.group })
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", function(d){ return size(d.size) })
        .style("fill", function(d){ return color(d.group) })
        .attr("stroke", function(d){ return color(d.group) })
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)


    // This function is gonna change the opacity and size of selected and unselected circles
    function update(){

      // For each check box:
      d3.selectAll(".checkbox").each(function(d){
        cb = d3.select(this);
        grp = cb.property("value")

        // If the box is check, I show the group
        if(cb.property("checked")){
          svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.size) })

        // Otherwise I hide it
        }else{
          svg.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
        }
      })
    }

    // When a button change, I run the update function
    d3.selectAll(".checkbox").on("change",update);

    // And I initialize it at the beginning
    update()
})

</script> */


// var large_land = data.filter(function(d) { return d.land_area > 200; });
// console.log(JSON.stringify(large_land));


// for ( var i=0; i < mapData.length; ++i ) 
// {
//    L.marker( [mapData[i].TouchdownLat, mapData[i].TouchdownLon] )
//       .bindPopup( '<a href="' + mapData[i].Damage + '" F"' + mapData[i].Fujita + '</a>' )
//       .addTo(mymap);
// }
// Set filteredAddresses to addressData initially
// var filteredMapdata = mapData;
// var inputyear = d3.select($userInput)

// console.log("set the placeholder");
// inputyear.attr("placeholder",selectType)
// inputyear.value='';
// var mapData = JSON.parse(mapdata);
// alert(mapData[0].name);
// alert(mapData[0].age);
// alert(mapData[1].name);
// alert(mapData[1].age);
