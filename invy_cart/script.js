// ------------------- BASIC SETUP -------------------
const $ = (s) => document.querySelector(s);

// ✅ Dashboard: Set Welcome Username
if (window.location.pathname.includes("dashboard.html")) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) window.location.href = "index.html";
  const welcome = document.getElementById("welcomeText");
  if (welcome) welcome.innerText = `Welcome, ${user} 👋`;
}

// ---------- THEME ----------
const themeSelector = $("#themeSelector");
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

if (themeSelector) {
  themeSelector.value = savedTheme;
  themeSelector.addEventListener("change", () => {
    const t = themeSelector.value;
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  });
}

// ---------- DEALS: premium rotating deals ----------
const deals = [
  { store: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", text: "Up to 60% Off Electronics ⚡️", link: "https://www.amazon.in" },
  { store: "Flipkart", logo: "https://tse1.mm.bing.net/th/id/OIP.VUIpQNXX_rvd2-mWUZ6S1QHaHX?pid=Api&P=0&h=180", text: "Mega Mobile Sale — Flat 50% Off 📱", link: "https://www.flipkart.com" },
  { store: "Meesho", logo: "https://tse1.mm.bing.net/th/id/OIP.rw994mz1-DGPDjY_rHC8kgAAAA?pid=Api&P=0&h=180", text: "Fashion & Home Starting at ₹99 👗", link: "https://www.meesho.com" },
  { store: "Ajio", logo: "https://tse3.mm.bing.net/th/id/OIP.yF1vj1aZcZ3pbGm2R7J-lAHaEK?pid=Api&P=0&h=180", text: "Branded Clothing Up to 70% Off 👟", link: "https://www.ajio.com" },
  { store: "Snapdeal", logo: "https://tse4.mm.bing.net/th/id/OIP.eHrxrmzgFGyF1RexSPKs8wHaDs?pid=Api&P=0&h=180", text: "Budget Deals Starting ₹49 💸", link: "https://www.snapdeal.com" },
  { store: "Tata CLiQ", logo: "https://tse4.mm.bing.net/th/id/OIP.cmrdR7Myv-IKKwnyqqjY7gHaEK?pid=Api&P=0&h=180", text: "Premium Brands Up to 50% Off 👜", link: "https://www.tatacliq.com" },
  { store: "Nykaa", logo: "https://tse3.mm.bing.net/th/id/OIP.CMm1pBwxCA33UsxuDYl5wQAAAA?pid=Api&P=0&h=180", text: "Beauty Essentials Flat 40–60% Off 💄", link: "https://www.nykaa.com" },
  { store: "Myntra", logo: "https://tse3.mm.bing.net/th/id/OIP.WP1tB2RD8aV8tYP-a46K1wHaE-?pid=Api&P=0&h=180", text: "Buy 1 Get 1 Free on Fashion 👗", link: "https://www.myntra.com" },
  { store: "BigBasket", logo: "https://tse3.mm.bing.net/th/id/OIP.BkPIeKKx6f0kw5Sw63R8jQHaFQ?pid=Api&P=0&h=180", text: "Groceries Starting at ₹1 🥦", link: "https://www.bigbasket.com" },
  { store: "Reliance Digital", logo: "https://tse3.mm.bing.net/th/id/OIP.TlLNrR8zd84DpIZy4A6WAwHaHa?pid=Api&P=0&h=180", text: "Laptops Up to 40% Off 💻", link: "https://www.reliancedigital.in" },
  { store: "JioMart", logo: "https://tse2.mm.bing.net/th/id/OIP.NWCISai9gj42RteAuANwrQHaEc?pid=Api&P=0&h=180", text: "Mobiles & Accessories Up to 55% Off 📱", link: "https://www.jiomart.com" }
];

const dealContainer = $("#dealContainer");
const dealText = $("#dealText");
const dealLogo = $("#dealLogo");
let dealIndex = 0;

function rotateDeals() {
  if (!dealContainer || !dealText || !dealLogo) return;
  dealContainer.style.opacity = 0;
  setTimeout(() => {
    const d = deals[dealIndex];
    dealText.textContent = `${d.store}: ${d.text}`;
    dealLogo.src = d.logo;
    dealContainer.onclick = () => window.open(d.link, "_blank");
    dealContainer.style.opacity = 1;
    dealIndex = (dealIndex + 1) % deals.length;
  }, 350);
}
setInterval(rotateDeals, 4200);
rotateDeals();

// ---------- STORES ----------
const defaultStores = [
  { name: "Amazon", link: "https://www.amazon.in", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Flipkart", link: "https://www.flipkart.com", logo: "https://tse1.mm.bing.net/th/id/OIP.VUIpQNXX_rvd2-mWUZ6S1QHaHX?pid=Api&P=0&h=180" },
  { name: "Meesho", link: "https://www.meesho.com", logo: "https://tse1.mm.bing.net/th/id/OIP.rw994mz1-DGPDjY_rHC8kgAAAA?pid=Api&P=0&h=180" },
  { name: "Myntra", link: "https://www.myntra.com", logo: "https://tse3.mm.bing.net/th/id/OIP.WP1tB2RD8aV8tYP-a46K1wHaE-?pid=Api&P=0&h=180" },
  { name: "Ajio", link: "https://www.ajio.com", logo: "https://tse3.mm.bing.net/th/id/OIP.yF1vj1aZcZ3pbGm2R7J-lAHaEK?pid=Api&P=0&h=180" },
  { name: "Snapdeal", link: "https://www.snapdeal.com", logo: "https://tse4.mm.bing.net/th/id/OIP.eHrxrmzgFGyF1RexSPKs8wHaDs?pid=Api&P=0&h=180" },
  { name: "Tata CLiQ", link: "https://www.tatacliq.com", logo: "https://tse4.mm.bing.net/th/id/OIP.cmrdR7Myv-IKKwnyqqjY7gHaEK?pid=Api&P=0&h=180" },
  { name: "Nykaa", link: "https://www.nykaa.com", logo: "https://tse3.mm.bing.net/th/id/OIP.CMm1pBwxCA33UsxuDYl5wQAAAA?pid=Api&P=0&h=180" },
  { name: "BigBasket", link: "https://www.bigbasket.com", logo: "https://tse3.mm.bing.net/th/id/OIP.BkPIeKKx6f0kw5Sw63R8jQHaFQ?pid=Api&P=0&h=180" },
  { name: "JioMart", link: "https://www.jiomart.com", logo: "https://tse2.mm.bing.net/th/id/OIP.NWCISai9gj42RteAuANwrQHaEc?pid=Api&P=0&h=180" },
  { name: "Reliance Digital", link: "https://www.reliancedigital.in", logo: "https://tse3.mm.bing.net/th/id/OIP.TlLNrR8zd84DpIZy4A6WAwHaHa?pid=Api&P=0&h=180" }
];

let stores = JSON.parse(localStorage.getItem("customStores") || "[]");
let editIndex = -1;

const grid = $(".grid-container");

function renderStores() {
  if (!grid) return;
  grid.innerHTML = "";

  const combined = [...defaultStores, ...stores];

  combined.forEach((store, idx) => {
    const isUserStore = idx >= defaultStores.length;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${store.logo}" alt="${store.name}">
      <h3>${store.name}</h3>
      <a href="${store.link}" target="_blank" class="visit-btn">Visit</a>
    `;

    if (isUserStore) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => startEdit(idx - defaultStores.length);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteStore(idx - defaultStores.length);

      card.appendChild(editBtn);
      card.appendChild(delBtn);
    }

    grid.appendChild(card);
  });
}
renderStores();

function startEdit(i) {
  const s = stores[i];
  if (!s) return;
  $("#storeName").value = s.name;
  $("#storeLink").value = s.link;
  $("#storeLogo").value = s.logo || "";
  editIndex = i;
  $("#addStoreBtn").textContent = "Update Store";
}

function deleteStore(i) {
  if (!confirm("Delete this store?")) return;
  stores.splice(i, 1);
  localStorage.setItem("customStores", JSON.stringify(stores));
  renderStores();
}

// Add / Update store
$("#addStoreBtn").addEventListener("click", () => {
  const name = $("#storeName").value.trim();
  const link = $("#storeLink").value.trim();
  const logo = $("#storeLogo").value.trim() || "https://via.placeholder.com/100";

  if (!name || !link) return alert("Please enter store name and link.");

  const item = { name, link, logo };

  if (editIndex >= 0) {
    stores[editIndex] = item;
    editIndex = -1;
    $("#addStoreBtn").textContent = "+ Add Store";
  } else stores.push(item);

  localStorage.setItem("customStores", JSON.stringify(stores));
  $("#storeName").value = $("#storeLink").value = $("#storeLogo").value = "";
  renderStores();
});

// Search stores
$("#searchStores").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    const t = (card.querySelector("h3")?.innerText || "").toLowerCase();
    card.style.display = t.includes(term) ? "" : "none";
  });
});

// ---------- PROFILE ----------


const headerProfilePic = $("#headerProfilePic");
const profilePanel = $("#profilePanel");
const closeProfile = $("#closeProfile");
const profileLargePic = $("#profileLargePic");
const profileName = $("#profileName");
const photoInput = $("#photoInput");
const loggedUser = localStorage.getItem("loggedInUser") || "User";

if (profileName) profileName.textContent = loggedUser;

// load saved pic
const savedPic = localStorage.getItem("profilePic");
if (savedPic) {
  profileLargePic.src = savedPic;
  headerProfilePic.src = savedPic;
}

// open panel
headerProfilePic.addEventListener("click", () => {
  profilePanel.classList.add("active");
});

// close panel
closeProfile.addEventListener("click", () => {
  profilePanel.classList.remove("active");
});

// change photo
$("#changePhotoBtn").addEventListener("click", () => photoInput.click());

photoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  headerProfilePic.src = url;
  profileLargePic.src = url;
  localStorage.setItem("profilePic", url);
});

// logout
$("#logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

// ---------- CHATBOT ----------
const chatbot = $("#chatbot");
const chatBody = $("#chat-body");
const userMsg = $("#userMsg");
const sendBtn = $("#sendBtn");
const chatToggle = $("#chatToggle");

function appendMessage(sender, text) {
  const el = document.createElement("div");
  el.className = sender === "You" ? "chat-user" : "chat-bot";
  el.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("hello") || m.includes("hi")) return "Hey! How can I help you?";
  if (m.includes("deal")) {
    const d = deals[(dealIndex - 1 + deals.length) % deals.length];
    return `Today's top deal: ${d.store} — ${d.text}`;
  }
  return "I can help with deals, stores, add, edit, delete!";
}

function sendMessage() {
  const msg = userMsg.value.trim();
  if (!msg) return;
  appendMessage("You", msg);
  userMsg.value = "";
  setTimeout(() => appendMessage("Nani 🤖", botReply(msg)), 350);
}

sendBtn.addEventListener("click", sendMessage);
userMsg.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// minimize chatbot
chatToggle.addEventListener("click", () => {
  chatbot.classList.toggle("minimized");
  chatToggle.textContent = chatbot.classList.contains("minimized") ? "+" : "−";
});
