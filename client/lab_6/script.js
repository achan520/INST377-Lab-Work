
const generateListButton = document.getElementById('generate');
const restaurant_list = document.getElementById('restaurant_list');



const restaurantSearch = document.getElementById('restaurant_search');
let allRestaurants = [];
generateListButton.addEventListener('click', () => {
  fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?restaurant=$')
  .then(response => response.json())
  .then(data => {
    if (data !== undefined && data !== null && typeof data === 'object') {
      allRestaurants = Object.keys(data);
      displayRestaurants(allRestaurants);
    } else {
      console.error('Invalid data received from API');
    }
})
});