const WEATHER_API_KEY = require('../helpers/weather_api_key.js')
const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');


const Weather = function() {
  this.data = null;
}

Weather.prototype.bindEvents = function() {
  PubSub.subscribe('Place:geocode-ready', (event) => {
    const longitude = event.detail.longitude;
    const latitude = event.detail.latitude;
    this.getData(longitude, latitude);
  })
}

Weather.prototype.getData = function(longitude, latitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API_KEY}`;
  const request = new Request(url);
  request.get()
    .then((data) => {
      this.data = data;
    })
    .then((data) => {
      console.log(this.data);
      const temperature = this.data.list[0].main.temp;
      const celciusTemperature = this.convertTemperatureIntoCelcius(temperature);
      const formattedCelciusTemperature = this.formatTemperature(celciusTemperature);
      const humidity = this.data.list[0].main.humidity;
      const description = this.data.list[0].weather[0].description;
      const windSpeed = this.data.list[0].wind.speed;
      const city = this.data.city.name;
      const weatherDataToDisplay = {
        location: city,
        temperature: formattedCelciusTemperature,
        humidityLevel: humidity,
        weatherDescription: description,
        wind: windSpeed
      }
      PubSub.publish('Weather:weather-data-ready', weatherDataToDisplay);
    })



}

Weather.prototype.convertTemperatureIntoCelcius = function(kelvinValue) {
  const celciusTemperature = kelvinValue - 273.15;
  return celciusTemperature;
}

Weather.prototype.formatTemperature = function(value) {
  const roundedValue = Math.round(value);
  return roundedValue;
}
module.exports = Weather;
