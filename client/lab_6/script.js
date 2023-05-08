const generateListButton = document.getElementById('generate');
const restaurant_list = document.getElementById('restaurant_list');



const restaurantSearch = document.getElementById('restaurant_search');
let allRestaurants = [];
generateListButton.addEventListener('click', () => {
    fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
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

const loadButton = document.getElementById('loadButton');


loadButton.addEventListener('click', () => {
  const restaurantName = 'Example Restaurant'; // Replace with the desired restaurant name

  const url = `https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?restaurant=${encodeURIComponent(restaurantName)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle the loaded data
      dataContainer.textContent = JSON.stringify(data, null, 2);
    })
   
});






// Function to display a list of breeds
function displayRestaurants(Restaurant) {
  // Clear any existing list items
  restaurant_list.innerHTML = '';

  // Loop through the breeds and add a new list item for each breed
  for (const restaurant of Restaurant) {
    const listItem = document.createElement('li');
    listItem.textContent = restaurant;
    restaurant_list.appendChild(listItem);
  }
}

// Add an event listener to the search box
restaurantSearch.addEventListener('input', () => {
  const searchString = restaurantSearch.value.trim().toLowerCase();
  const filteredRestaurants = allRestaurants.filter(restaurant => restaurant.toLowerCase().includes(searchString));
  displayRestaurants(filteredRestaurants);
});








