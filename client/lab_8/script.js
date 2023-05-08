/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min + 1) + min);
  
  }
  
  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item, index) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str
    })
    /*
    ## JS and HTML Injection
      There are a bunch of methods to inject text or HTML into a document using JS
      Mainly, they're considered "unsafe" because they can spoof a page pretty easily
      But they're useful for starting to understand how websites work
      the usual ones are element.innerText and element.innerHTML
      Here's an article on the differences if you want to know more:
      https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  
    ## What to do in this function
      - Accept a list of restaurant objects
      - using a .forEach method, inject a list element into your index.html for every element in the list
      - Display the name of that restaurant and what category of food it is
  */
  
  }
  
  function filterList(list, query) {
    /*
      Using the .filter array method, 
      return a list that is filtered by comparing the item name in lower case
      to the query in lower case
    */
  
      return list.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery);
      })
  }
  
  function cutRestaurantList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()]; /* a smaller array, makes an array of 15 elements */
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length - 1);
      return list[index]
  
    }) /* applies every function to every element inside an array and returns the new transformed element to a new array */
  
  }

  function initMap() {
    //38.9072° N, 77.0369° W
    const carto = L.map('map').setView([38.98, -76.93], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carto);
    return carto;

  }

  function markerPlace(array, map){
    console.log('array for markers', array);

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });


    array.forEach((item) => {
        console.log('markerPlace', item);
        const {coordinates} = item.geocoded_column_1.coordinates;
        L.marker([coordinates[1], coordinates[0]]).addTo(map);
    })
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    // Add a querySelector that targets your filter button here
    const loadDataButton = document.querySelector('#data_load');
    const clearDataButton = document.querySelector('#data_clear');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto');
  
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden');

    const carto = initMap();
  
    const storedData = localStorage.getItem('storedData');
    let parsedData = JSON.parse(storedData);
    if (parsedData?.length > 0){
      generateListButton.classList.remove("hidden");
    }

    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => {
      
      // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
      console.log('Loading data');
      loadAnimation.style.display = 'inline-block';
  
      /*
        ## GET requests and Javascript
          We would like to send our GET request so we can control what we do with the results
          Let's get those form results before sending off our GET request using the Fetch API
      
        ## Retrieving information from an API
          The Fetch API is relatively new,
          and is much more convenient than previous data handling methods.
          Here we make a basic GET request to the server using the Fetch method to the county
      */
  
       // Basic GET request - this replaces the form Action
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
       // This changes the response from the GET into data we can use - an "object"
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      parsedData = storedList;
      // Make sure generate button toggles properly when load button is clicked
      if (parsedData?.length > 0){
        generateListButton.classList.remove("hidden");
      }
      
      loadAnimation.style.display = 'none';
      //console.table(storedList); /*This array initially contains all 1,000 records from your request,*/
     }); // async has to be declared on every function that needs to "await" something
  
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      currentList = cutRestaurantList(storedList);
      console.log(currentList);
      injectHTML(currentList);
      markerPlace(currentList, carto);
        
    })

    textField.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        const newList = filterList(currentList, event.target.value);
        console.log(newList);
        injectHTML(newList);
        markerPlace(newList, carto);
    });

    clearDataButton.addEventListener("click", (event) => {
        console.log('clear browser data');
        localStorage.clear();
        console.log('localStorage check', localStorage.getItem("storedData"));
    })
  }
  function processRestaurants(list) {
    console.log('fired restaurants list');
  
    /*
      ## Process Data Separately From Injecting It
        This function should accept your 1,000 records
        then select 15 random records
        and return an object containing only the restaurant's name, category, and geocoded location
        So we can inject them using the HTML injection function
  
        You can find the column names by carefully looking at your single returned record
        https://data.princegeorgescountymd.gov/Health/Food-Inspection/umjn-t2iz
  
      ## What to do in this function:
  
      - Create an array of 15 empty elements (there are a lot of fun ways to do this, and also very basic ways)
      - using a .map function on that range,
      - Make a list of 15 random restaurants from your list of 100 from your data request
      - Return only their name, category, and location
      - Return the new list of 15 restaurants so we can work on it separately in the HTML injector
    */
  }
  
  async function mainEvent() {
    /*
      ## Main Event
        Separating your main programming from your side functions will help you organize your thoughts
        When you're not working in a heavily-commented "learning" file, this also is more legible
        If you separate your work, when one piece is complete, you can save it and trust it
    */
  
    // the async keyword means we can make API requests
    const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
    const submit = document.querySelector('button[type="submit"]'); // get a reference to your submit button
    submit.style.display = 'none'; // let your submit button disappear
  
    /*
      Let's get some data from the API - it will take a second or two to load
      
     */
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const arrayFromJson = await results.json(); // here is where we get the data from our request as JSON
  
    /*
      Below this comment, we log out a table of all the results:
    */
    console.table(arrayFromJson);
  
    // As a next step, log the first entry from your returned array of data.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    console.log(`replace me with the first entry`);
  
    // Now write a log using string interpolation - log out the name and category of your first returned entry (index [0]) to the browser console
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
    console.log(`replace me with the name and category of the first entry`);
  
    // This IF statement ensures we can't do anything if we don't have information yet
    if (arrayFromJson?.length > 0) { // the question mark in this means "if this is set at all"
      submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
  
      // And here's an eventListener! It's listening for a "submit" button specifically being clicked
      // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
      form.addEventListener('submit', (submitEvent) => {
        // Using .preventDefault, stop the page from refreshing when a submit event happens
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  
        // This constant will contain the value of your 15-restaurant collection when it processes
        const restaurantList = processRestaurants(arrayFromJson);
  
        // And this function call will perform the "side effect" of injecting the HTML list for you
        injectHTML(restaurantList);
      });
    }
  }
  
  /*
    This last line actually runs first!
    It's calling the 'mainEvent' function at line 57
    It runs first because the listener is set to when your HTML content has loaded
  */
  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
  