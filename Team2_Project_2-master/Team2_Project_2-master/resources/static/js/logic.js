// Store API cityLink
const cityLink = "resources/static/dataset/full-data-geojson.js"
const hospitalLink = "resources/static/dataset/hospitals.js"

// Perform a GET request to the query City URL
d3.json(cityLink, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});


// Perform a GET request to the query Hospital URL
d3.json(hospitalLink, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  hospitalFeatures(data.features);
});


// function createFeatures(cityPoi) {

//   var citypoints = L.geoJSON(cityPoi, {
//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//  onEachFeature : function (feature, layer) {

//     layer.bindPopup(
//       "<h3>" + "Nearest Airport " + feature.properties.airportdist + " miles" +
//       "</h3><hr><p>" + "Avg Income " + (feature.properties.inccyavehh) + "</p>" +
//       "<p> Avg Cummute: " +  feature.properties.trwave + " min"+ "</p>")
//     },    
    
//     pointToLayer: function (feature, latlng) {
//       return new L.marker(latlng,
//         {fillOpacity: .5,
//         fillColor: "red",
//         radius: 100*10,
//         stroke: false
//     })
//   }
//   }); 

//   // Sending our citypoints layer to the createMap function
//   createMap(citypoints);
// }

let my_links = [cityLink]

function hospitalFeatures(hospitalPoi) {

  var hospitalpoints = L.geoJSON(hospitalPoi, {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
 onEachFeature : function (feature, layer) {

    layer.bindPopup(
      "<h3>" + "Hospital Name " + feature.properties.NAME +
      "</h3><hr><p>" + "Type Facility " + (feature.properties.TYPE) + "</p>" +
      "<p> Number of Beds: " +  feature.properties.BEDS + "</p>")
    },    
    
    pointToLayer: function (feature, latlng) {
      return new L.marker(latlng,
        {fillOpacity: .5,
        fillColor: "green",
        radius: 100*10,
        stroke: false
    })
  }
  }); 

  // Sending our hospitalpoints layer to the createMap function
  createMap(hospitalpoints);
}

function createMap(citypoints) {

  // Add map layers
 let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.dark",
    accessToken: API_KEY
  });


  let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 30,
  id: "mapbox.light",
  accessToken: API_KEY
  }); // what goes here?

 // Create our map, giving it the darkmap and citypoints layers to display on load
 var myMap = L.map("map-id", {
  center: [32.7767, -96.7970],
  zoom: 4,
  layers: [darkmap, citypoints]
  });

  // Define a baseMaps object
  var baseMaps = {
    "Dark Map": darkmap,       
    "Light Map": lightmap
  };

  // Create overlay object 
  var overlayMaps = {
    "citypoints": citypoints
    // "hospitalpoints": hospitalpoints
  };


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
  