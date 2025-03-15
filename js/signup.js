import { apiRequest } from "./api.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await apiRequest("/auth/patient/signup", "POST", { name, email, password });

  if (response.error) {
    alert("Signup Failed: " + response.error);
  } else {
    alert("Signup Successful! Please Login.");
    window.location.href = "login.html"; // Redirect to login
  }
});