document.addEventListener("DOMContentLoaded", function () {
  // Navigation variables
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector("nav");
  const closeMenu = document.querySelector(".close-menu");
  const navLinks = document.querySelectorAll(".nav-links li a");

  const cartItems = document.querySelectorAll(".item");

  // Reservation variables
  const form = document.getElementById("reservation-form");
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const modal = document.getElementById("successModal");
  const closeModalButton = document.getElementById("closeModal");
  const totalAmountElement = document.getElementById("total-amount");
  const totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

  // order and cart variables
  const searchInput = document.querySelector(".search-input");
  const searchItems = document.querySelectorAll("details-container");
  const addToCartButton = document.querySelectorAll(".add-to-cart");
  const closeCartItem = document.querySelectorAll(".close-menu-cart");

  // Toggle the hamburger menu and the close menu whenever necessary
  function toggleNav() {
    nav.classList.toggle("active");
    hamburgerMenu.style.display = nav.classList.contains("active")
      ? "none"
      : "block";
    closeMenu.style.display = nav.classList.contains("active")
      ? "block"
      : "none";
  }

  hamburgerMenu.addEventListener("click", toggleNav);
  closeMenu.addEventListener("click", toggleNav);

  const windowPathname = window.location.pathname;

  // Add an active class for any clicked nav item
  navLinks.forEach((link) => {

    if(link.href.includes(windowPathname)){
      console.log(link.href);
      link.classList.add("active");
    }
    // link.addEventListener("click", function () {
    //   // Log the href attribute of the clicked link
    //   console.log(`Clicked link: ${this.getAttribute("href")}`);

    //   // Remove the 'active' class from all links
    //   navLinks.forEach((otherLink) => {
    //     console.log(
    //       `Removing 'active' from: ${otherLink.getAttribute("href")}`
    //     );
    //     otherLink.classList.remove("active");
    //   });

    //   // Add the 'active' class to the clicked link
    //   console.log(`Adding 'active' to: ${this.getAttribute("href")}`);
    //   this.classList.add("active");
    // });
  });

  // Validate the reservation form
  console.log(form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = validateInputs();
    console.log("Validation result:", isValid); // Log the result of the validation

    if (isValid) {
      form.submit();
      form.reset(); // Reset the form
    }
  });

  // Validate form inputs
  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  };

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const phoneRegex = /^[0-9-]+$/;

  const validateInputs = () => {
    const dateValue = date.value.trim();
    const timeValue = time.value.trim();
    const emailValue = email.value.trim();
    const fullNameValue = fullName.value.trim();
    const phoneValue = phone.value.trim();

    let allValid = true;

    if (dateValue === "") {
      setError(date, "field cannot be blank");
      allValid = false;
    } else {
      setSuccess(date);
    }

    if (timeValue === "") {
      setError(time, "field cannot be blank");
      allValid = false;
    } else {
      setSuccess(time);
    }

    if (fullNameValue === "") {
      setError(fullName, "Username is required");
      allValid = false;
    } else if (/\d/.test(fullNameValue)) {
      setError(fullName, "Name must not contain number");
      allValid = false;
    } else {
      setSuccess(fullName);
    }

    if (emailValue === "") {
      setError(email, "Email is required");
      allValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Provide a valid email address");
      allValid = false;
    } else {
      setSuccess(email);
    }

    if (phoneValue === "") {
      setError(phone, "Phone number is required");
      allValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
      setError(phone, "Invalid phone number");
      allValid = false;
    } else {
      setSuccess(phone);
    }

    return allValid;
  };

  // When the user clicks the button, open the modal
  closeModalButton.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Cart section
  //  Whenever we click on "add-to-cart" button on the orders menu
  // Search functionality
  function fetchItems() {
    fetch("/menu.json")
      .then((response) => response.json())
      .then((data) => {
        const items = data;
        function filterItems(searchQuery) {
          items.forEach((item) => {
            const itemName = item.name.toLowerCase();
            if (itemName.includes(searchQuery.toLowerCase())) {
              displayItem(item);
            } else {
              hideItem(item);
            }
          });
        }
        searchInput.addEventListener("input", (event) => {
          const searchQuery = event.target.value;
          filterItems(searchQuery);
        });
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }

  // Function to display an item
  function displayItem(item) {
    // Create the HTML for the item and append it to the DOM
    // This is a placeholder function, you'll need to implement the actual HTML creation
    console.log("Display item:", item);
  }

  // Function to hide an item
  function hideItem(item) {
    // Find the item element in the DOM and set its display to 'none'
    // This is a placeholder function, you'll need to implement the actual DOM manipulation
    console.log("Hide item:", item);
  }

  // Call the function to fetch and parse the JSON data
  fetchItems();

  //   })
  // }
  function filterItems(searchQuery) {
    searchItems.forEach((item) => {
      const itemName = item.querySelector(".item-name");
      if (itemName.includes(searchQuery.toLowerCase())) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    console.log(searchQuery);
    filterItems(searchQuery);
  });
});
