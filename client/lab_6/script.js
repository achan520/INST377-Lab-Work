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