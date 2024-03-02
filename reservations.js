
const form = document.getElementById("reservation-form");
const date = document.getElementById("date");
const time = document.getElementById("time");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const modal = document.getElementById("successModal");
const closeModalButton = document.getElementById("closeModal");


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