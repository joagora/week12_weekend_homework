const PubSub = require('../helpers/pub_sub.js');
const GEOCODE_API_KEY = require('../helpers/geocode_api_key.js');
const Request = require('../helpers/request.js');

const Place = function() {
  this.longitude = null;
  this.latitude = null;
}

Place.prototype.bindEvents = function() {
  PubSub.subscribe('SearchView:city-selected', (event) => {
    const typedCity = event.detail;
    const cityPrepared = this.prepareInput(typedCity);
    this.getData(cityPrepared);
  })
}

Place.prototype.getData = function(city) {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODE_API_KEY}&location=${city}`;
  const request = new Request(url);
  request.get()
    .then((data) => {
      this.longitude = data.results[0].locations[0].latLng.lng;
      this.latitude = data.results[0].locations[0].latLng.lat;
      const geocode = {
        longitude: this.longitude,
        latitude: this.latitude
      }
      PubSub.publish('Place:geocode-ready', geocode);

    })
    .catch((message) => {
      console.error(message);
    });
}


Place.prototype.prepareInput = function(string) {
  const preparedString = string.replace(' ', '+');
  return preparedString;
}
module.exports = Place;
