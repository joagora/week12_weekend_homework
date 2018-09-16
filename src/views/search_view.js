const PubSub = require('../helpers/pub_sub.js');
const SearchView = function(searchContainer) {
  this.searchContainer = searchContainer;
}

SearchView.prototype.bindEvents = function() {
  this.searchContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const typedCity = event.target['search-bar'].value;
    PubSub.publish('SearchView:city-selected', typedCity);
    event.target.reset();
  })
}
module.exports = SearchView;
