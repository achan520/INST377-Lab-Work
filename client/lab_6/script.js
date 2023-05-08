const generateListButton = document.getElementById('generate');
const restaurant_list = document.getElementById('restaurant_list');



const restaurantSearch = document.getElementById('restaurant_search');
let allRestaurants = [];
generateListButton.addEventListener('click', () => {
    fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    .then(response => response.json())
    .then(data => {
        allRestaurants = Object.keys(data.message);
        displayRestaurants(allRestaurants);
  })
});



//Get data from API and load into the collection
fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      const dogs = Object.keys(data.message);
      collection.data = dogs;
      collection.save(); // Save the collection to localStorage
      console.log('Dog breeds data loaded and stored in the collection.');
    } else {
      console.log('Failed to retrieve dog breeds data from API.');
    }
  });


// Function to display a list of breeds
function displayRestaurants(restaurants) {
  // Clear any existing list items
  restaurant_list.innerHTML = '';

  // Loop through the breeds and add a new list item for each breed
  for (const restaurant of restaurants) {
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