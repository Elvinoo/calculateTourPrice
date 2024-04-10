document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Define your predefined username and password
    const predefinedUsername = "VAtravel";
    const predefinedPassword = "VAtravel0552775017";

    // Check if the entered credentials match the predefined values
    if (username === predefinedUsername && password === predefinedPassword) {
      // If credentials match, redirect to the main application or display a success message
      alert("Login successful!");
      window.location.href = "calculator.html";
      // You can redirect to another page using window.location.href = "main.html";
    } else {
      // If credentials don't match, display an error message
      alert("Invalid username or password!");
    }
  });
