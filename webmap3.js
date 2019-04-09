let stateMap = L.map('map3').setView([32.18, -99.14], 4)
let basemapUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
L.tileLayer(basemapUrl).addTo(stateMap)
let stateDemographicsUrl = 'https://geog4046.github.io/portfolio/data/us_state_demographics_ESRI_2010A.geojson'
jQuery.getJSON(stateDemographicsUrl, function (data) {
  let stateStyle = function (feature) {
    let age = feature.properties.MED_AGE // get the current state's Median Age attribute
    let stateColor = 'olive' // let the initial color be a darker green
    if (age < 38) { stateColor = 'green' } // if the state's median age is less than the average, color it a lighter green
    return {
      color: stateColor, // use the color variable above for the value
      weight: 1,
      fillOpacity: 0.2
    }
  }
  let onEachFeature = function (feature, layer) {
    let name = feature.properties.STATE_NAME
    let age = feature.properties.MED_AGE
    layer.bindPopup('Median age of ' + name + ': ' + age + '<br>National average: 38')
  }
  let geojsonOptions = {
    style: stateStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, geojsonOptions).addTo(stateMap)
})
