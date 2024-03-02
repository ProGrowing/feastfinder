const searchItems = document.querySelectorAll("details-container");
const menuDetails = document.querySelector(".details");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const searchInput = document.querySelector(".search-input");
const pagination = document.querySelector(".pagination");
const prevButton = document.querySelector(".btn.prev");
const nextButton = document.querySelector(".btn.next");

// Function to display an item on the orders page
function displayItem(item) {
  let foodmenu = document.createElement("div");
  foodmenu.dataset.id = item.id;
  foodmenu.classList.add("details-container");
  foodmenu.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="200px" height="200px" loading="lazy">
                <div class="key-details">
                <b class="item-name">${item.name}</b>
                <p class="ingredients">${item.ingredients}</p>
                </div>
                <div class="information">
                <b class="price">$${item.price}</b>
              <button class="add-to-cart">Add</button>
            </div>
                `;
  menuDetails.appendChild(foodmenu);
}

const itemsPerPage = 6;
let currentPage = 1;
let totalPages;

// load the details from the JSON file
async function fetchMenuItems() {
  try {
    const response = await fetch("/menu.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

// Function to display items for the current page
function displayMenuItems(items, start, end) {
  menuDetails.innerHTML = "";
  const itemsToDisplay = items.slice(start, end);
  console.log(itemsToDisplay);
  itemsToDisplay.forEach((item) => displayItem(item));
}

// Function to update the pagination buttons
function updatePaginationButtons() {
  //initially do not display any button
  prevButton.style.display = "none";
  nextButton.style.display = "none";

  // show the prev button if the current page is greater than 1
  if (currentPage > 1) {
    prevButton.style.display = "block";
  }

  // show the next button if the current page is less than the total number of pages
  if (currentPage < totalPages) {
    nextButton.style.display = "block";
  }
}

// Function to handle pagination
async function handlePagination(newPage) {
  currentPage = newPage;
  console.log(currentPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = await fetchMenuItems();
  displayMenuItems(items, start, end);
  updatePaginationButtons();
}

// Add event listeners to the pagination buttons
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    handlePagination(currentPage);
    console.log(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    handlePagination(currentPage);
    console.log(currentPage);
  }
});

//Initialize the app on page load
async function initializeApp() {
  const cartItems = await fetchMenuItems();
  totalPages = Math.ceil(cartItems.length / itemsPerPage);
  displayMenuItems(cartItems, 0, itemsPerPage);
  updatePaginationButtons();
}

initializeApp();

// Function to filter items based on search query
async function filterItems(searchQuery) {
  const lowercasedQuery = searchQuery.toLowerCase();
  const items = await fetchMenuItems(); // Fetch the items from the JSON file
 
  // Filter the items based on the search query
  const filteredItems = items.filter(item => {
     const itemName = item.name.toLowerCase();
     return itemName.includes(lowercasedQuery);
  });
 
  // Clear the current items from the display
  menuDetails.innerHTML = '';
 
  // Display the filtered items
  filteredItems.forEach(item => displayItem(item));
 
  // Update the pagination buttons based on the filtered items
  totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  updatePaginationButtons();
 }

// Initialise the search upon every input
searchInput.addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  console.log(searchQuery);
  filterItems(searchQuery);
});

// Add to cart button
function addToCart(item) {
  console.log("addToCart function called");
  const itemName = item.querySelector(".item-name").textContent;
  const itemprice = item.querySelector(".price").textContent;
  const itemimage = item.querySelector("img").src;

  //create an item object with the item details
  const itemObject = {
    name: itemName,
    price: itemprice,
    image: itemimage,
  };

  //Retrieve the current cart items from storage
  // Check if cartItems is already defined in the localStorage and parse it, otherwise set it as an empty array
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(cartItems);


  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === itemName);

  if(existingItemIndex !== -1){
    //If there is an item with the same name, throw an alert
    alert("This item is already in your cart.");
  } else{
    //If there is no item with the same name, add a new item with quantity of 1
    cartItems.push({ ...itemObject, quantity: 1 });
  }

  // save the updated cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  window.localStorage.setItem("cartUpdated", "true");

  // update the cart notification
  updateCartNotification(cartItems.length);

  // update the cart page
  updateCartPage();
 

  console.log(itemObject);
}

//window.addEventListener('DOMContentLoaded', updateCartPage);
window.addEventListener("storage", (event) => {
  if (event.key === "cartUpdated") {
    updateCartPage();

  }
});


// update the cart page
function updateCartPage(item) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

}

// document.addEventListener('DOMContentLoaded', function () {
document.addEventListener("click", function (event) {
  if (event.target.matches(".add-to-cart")) {
    console.log("Add to cart button clicked");
    const item = event.target.closest(".details-container");
    console.log(item);
    addToCart(item);
  }
});

