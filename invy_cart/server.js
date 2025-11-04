const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    localStorage.setItem("loggedInUser", user);
    window.location.href = "dashboard.html";
  });
}

// Dashboard Protection
if (window.location.pathname.includes("dashboard.html")) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "index.html";
  }
}

// Logout Function
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// Open App
function openApp(url) {
  window.open(url, "_blank");
}

// Search Filter
function filterApps() {
  const input = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".app-card");
  cards.forEach(card => {
    const name = card.querySelector("h4").innerText.toLowerCase();
    card.style.display = name.includes(input) ? "block" : "none";
  });
}
