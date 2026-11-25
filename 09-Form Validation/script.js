function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showMessage(element, text, isSuccess) {
  element.textContent = text;
  element.className = isSuccess ? "message success" : "message error";
}

var registrationForm = document.getElementById("registrationForm");
var registrationMessage = document.getElementById("registrationMessage");

registrationForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("registerEmail").value.trim();
  var password = document.getElementById("registerPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    showMessage(registrationMessage, "Please fill in all fields.", false);
  } else if (!isValidEmail(email)) {
    showMessage(registrationMessage, "Please enter a valid email address.", false);
  } else if (password.length < 6) {
    showMessage(registrationMessage, "Password must contain at least 6 characters.", false);
  } else if (password !== confirmPassword) {
    showMessage(registrationMessage, "Passwords do not match.", false);
  } else {
    showMessage(registrationMessage, "Registration details are valid.", true);
  }
});

var loginForm = document.getElementById("loginForm");
var loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    showMessage(loginMessage, "Please fill in all fields.", false);
  } else if (!isValidEmail(email)) {
    showMessage(loginMessage, "Please enter a valid email address.", false);
  } else if (password.length < 6) {
    showMessage(loginMessage, "Password must contain at least 6 characters.", false);
  } else {
    showMessage(loginMessage, "Login details are valid. No account was checked.", true);
  }
});
