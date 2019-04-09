let stateMap = L.map('map3').setView([32.18, -99.14], 4)
let basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
L.tileLayer(basemapUrl).addTo(stateMap)
let grayBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(stateMap)
let streetsBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(stateMap)
let basemaps = {
  'Streets': streetsBasemap,
  'Gray canvas': grayBasemap
}
L.control.layers(basemaps).addTo(stateMap)
let statesLayer = L.layerGroup().addTo(stateMap)
let stateDemographicsUrl = 'https://geog4046.github.io/portfolio/data/us_state_demographics_ESRI_2010A.geojson'
jQuery.getJSON(stateDemographicsUrl, function (data) {
  let stateStyle = function (feature) {
    let population = feature.properties.POPULATION // get the current state's population attribute
    let stateColor = 'light blue' // let the initial color be a darker blue
    if (population < 100000) { stateColor = 'blue' } // if the state's population is less than the average, color it a lighter green
    return {
      color: stateColor, // use the color variable above for the value
      weight: 1,
      fillOpacity: 0.2
    }
  }
  let onEachFeature = function (feature, layer) {
    let name = feature.properties.STATE_NAME
    let population = feature.properties.POPULATION
    layer.bindPopup('Population of ' + name + ': ' + population + '<br>National average: 38')
    statesLayer.addLayer(layer)
  }
  let geojsonOptions = {
    style: stateStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, geojsonOptions).addTo(stateMap)
})
