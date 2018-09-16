const SearchView = require('./views/search_view.js');
const Place = require('./models/place.js');
const Weather = require('./models/weather.js');
const WeatherDetailsView = require('./views/weather_details_view.js');
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#search');
  const searchView = new SearchView(searchForm);
  searchView.bindEvents();

  const place = new Place();
  place.bindEvents();

  const weather = new Weather();
  weather.bindEvents();

  const weatherDetailsDiv = document.querySelector('#weather');
  const weatherDetailsView = new WeatherDetailsView(weatherDetailsDiv);
  weatherDetailsView.bindEvents();
})
