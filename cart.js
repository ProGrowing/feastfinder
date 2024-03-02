const searchInput = document.querySelector(".search-input");
const searchItems = document.querySelectorAll("details-container");

function displayCartItems() {
  // Retrieve the cart details from localStorage
  const cartItem = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(cartItem);   

  const cartContainer = document.querySelector(".cart-item");
  cartContainer.innerHTML = "";

  // Loop through the cart items and display them in the cart page
  cartItem.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("item");
    // const quantity =
    //   item.quantity !== undefined && !isNaN(item.quantity) ? item.quantity : 1; // Default to 1 if quantity is undefined or not a number
    cartItemElement.innerHTML = `
    <img src="${item.image}" alt="${item.name}  width="100px" height="100px" loading="lazy">
    <span class="close-menu-cart material-symbols-outlined">close</span>
    <div class="details">
      <h3>${item.name}</h3>
      <p class="amount">${item.price}</p>
    </div>
    <div class="quantity">
      <input type="number" name="name" value="${item.quantity}" min="1">
    </div>
    <div class="sub-total">${item.price}</div>
  `;
    cartContainer.appendChild(cartItemElement);
  });

  const cartItems = document.querySelectorAll(".item");
  console.log(cartItems);

  cartItems.forEach((item) => {
    const quantityInput = item.querySelector('.quantity input[type="number"]');
    const amountDisplay = item.querySelector(".amount");
    const itemPrice = parseFloat(amountDisplay.textContent.replace("$", "")); // Extract the price from the sub-total display
    const subTotalDisplay = item.querySelector(".sub-total");
    const removeButton = item.querySelector(".close-menu-cart");

        // Initialize the old sub-total for this item
        let oldSubTotal = parseFloat(subTotalDisplay.textContent.replace("$", ""));


    // Listen for changes to the quantity input
    quantityInput.addEventListener("input", function () {
  const quantity = parseInt(quantityInput.value, 10);
  const subTotal = quantity * itemPrice;
  subTotalDisplay.textContent = `$${subTotal.toFixed(2)}`; // Update the sub-total display

 // Update the total amount
 const totalAmountDisplay = document.querySelector('#total-amount');
 const totalAmount = parseFloat(totalAmountDisplay.textContent.replace("$", ""));
 //const oldSubTotalForThisItem = oldSubTotals.get(index);
 const newTotalAmount = totalAmount - oldSubTotal + subTotal;
      totalAmountDisplay.textContent = `$${newTotalAmount.toFixed(2)}`;


 // Update the old sub-total for the next change
 oldSubTotal = subTotal;

 console.log(newTotalAmount);

 
});

removeButton.addEventListener("click", function (e) {
  const itemToRemove = e.target.closest(".item"); // Get the entire item element
  const itemIndex = cartItem.findIndex(cartItem => cartItem.name === itemToRemove.querySelector('.details h3').textContent); // Get its index in the cartItems array

  if (itemIndex !== -1) {// Check if the item exists
    cartItem.splice(itemIndex, 1); // Remove the item from the cartItem array
    localStorage.setItem("cartItems", JSON.stringify(cartItem)); // Update local storage
    itemToRemove.remove(); // Remove the item from the cart display
    displayCartItems(); // Update the total amount
    updateCartNotification(cartItems.length); // Update the cart notification
    location.reload();
    }
  });

 // Calculate and display the total amount for all cart items
 const totalAmount = Array.from(cartItems).reduce((total, item) => {
  const subTotalDisplay = item.querySelector(".sub-total");
  const subTotal = parseFloat(subTotalDisplay.textContent.replace("$", ""));
  return total + subTotal;
}, 0); // Start with a total of 0

// Update the total amount display
const totalAmountDisplay = document.querySelector('#total-amount');
totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
});
};




// Call the function to display cart items when the cart page loads
document.addEventListener("DOMContentLoaded", displayCartItems);

// Listen for changes to local storage
window.addEventListener("storage", function (event) {
  if (event.key === "cartItems") {
    displayCartItems();
  }
});

// Select the checkout button
const checkoutButton = document.querySelector(".checkout");

// Add an event listener to the checkout button
checkoutButton.addEventListener("click", function () {
 // Retrieve the cart details from localStorage
 const cartItem = JSON.parse(localStorage.getItem("cartItems")) || [];

 // Check if there is at least one item in the cart
 if (cartItem.length >= 1) {
    // Select the modal element
    const modal = document.getElementById("successModal");

    // clear local storage and update cart notification
    localStorage.clear();
    updateCartNotification(0);
    
    // Display the modal
    modal.style.display = "block";
 } else {
    // Optionally, you can display a message to the user if the cart is empty
    alert("Your cart is empty. Please add items to proceed.");
 }
});

// Select the close button inside the modal
const closeModalButton = document.getElementById("closeModal");

// Add an event listener to the close button
closeModalButton.addEventListener("click", function () {
 // Select the modal element
 const modal = document.getElementById("successModal");
 // Hide the modal
 modal.style.display = "none";
});
