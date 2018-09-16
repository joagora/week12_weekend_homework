const PubSub = require('../helpers/pub_sub.js');
const WeatherDetailsView = function(container){
  this.container = container;
}

WeatherDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('Weather:weather-data-ready', (event) => {
    const weatherDetails = event.detail;
    this.render(weatherDetails);
  })
}

WeatherDetailsView.prototype.render = function(data) {
  const cityHeader = document.querySelector('#city');
  cityHeader.textContent = data.location;

  const weatherUl = document.querySelector('#weatherDetails');
  weatherUl.textContent = '';
  const temperatureLi = document.createElement('li');
  weatherUl.appendChild(temperatureLi);
  temperatureLi.textContent = `${data.temperature} ℃`;

  const humidityLi = document.createElement('li');
  weatherUl.appendChild(humidityLi);
  humidityLi.textContent = `${data.humidityLevel}%`;

  const weatherDescriptionLi = document.createElement('li');
  weatherUl.appendChild(weatherDescriptionLi);
  weatherDescriptionLi.textContent = data.weatherDescription;

  const windSpeedLi = document.createElement('li');
  weatherUl.appendChild(windSpeedLi);
  windSpeedLi.textContent = `${data.wind} mph`;
}
module.exports = WeatherDetailsView;
