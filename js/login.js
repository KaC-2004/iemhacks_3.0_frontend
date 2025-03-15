import { apiRequest } from "./api.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await apiRequest("/auth/patient/login", "POST", { email, password });

  if (response.error) {
    alert("Login Failed: " + response.error);
  } else {
    localStorage.setItem("token", response.token);
    window.location.href = "dashboard.html"; // Redirect after login
  }
});