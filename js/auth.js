// Base URL of the backend (change if needed)
const BASE_URL = "http://localhost:5000";

// Function to handle user signup
async function signupUser(userType, formData) {
    try {
        const response = await fetch(`${BASE_URL}/${userType}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Signup Error:", error);
    }
}

// Function to handle user login
async function loginUser(userType, formData) {
    try {
        const response = await fetch(`${BASE_URL}/${userType}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Login Error:", error);
    }
}

// Integrating with login form
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form[action='#']");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const response = await loginUser("patient", { username, password });
            console.log(response);
        });
    }

    const signupForm = document.querySelector("form[action='#']");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const fullname = document.getElementById("fullname").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const response = await signupUser("patient", { fullname, email, password });
            console.log(response);
        });
    }
});
