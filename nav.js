const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector("nav");
  const closeMenu = document.querySelector(".close-menu");
  const navLinks = document.querySelectorAll(".nav-links li a");
  
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
});

function updateCartNotification(itemCount) {
    localStorage.setItem("cartCount", itemCount);
    const cartNotification = document.querySelector('.cart-notification');
    cartNotification.textContent = itemCount;
  }

  function initializeCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartNotification(cartItems.length);
  }

  // Call the initializeCart function when the page loads
  window.addEventListener('DOMContentLoaded', function () {
    initializeCart();
  });
  