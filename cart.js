// ==============================
//  CART STORAGE
// ==============================
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
//  ADD / REMOVE ITEMS
// ==============================
function addToCart(name, price, image = "") {
  const cart = getCart();
  cart.push({ name, price: Number(price), image });
  saveCart(cart);
  updateCartCount();
  alert(`${name} added to cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartPage();
  updateCartCount();
}

// ==============================
//  CART COUNTER
// ==============================
function updateCartCount() {
  const cart = getCart();
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cart.length;
}

// ==============================
//  CART PAGE RENDER
// ==============================
function updateCartPage() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.price);

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" class="cart-thumb">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>R${item.price}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;

    container.appendChild(div);
  });

  totalEl.textContent = "R" + total;
}

// ==============================
//  PAYFAST FIELD SYNC
// ==============================
function prepareCheckout() {
  const email = document.getElementById("customerEmail").value;

  if (!email) {
    alert("Please enter your email address before paying.");
    return false;
  }

  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  document.getElementById("pf-email").value = email;
  document.getElementById("pf-cart-json").value = JSON.stringify(cart);
  document.getElementById("pf-amount").value = total.toFixed(2);

  document.getElementById("pf-return").value =
    "https://bohoblackboard.github.io/boho/success.html" +
    "?email=" + encodeURIComponent(email) +
    "&custom_str1=" + encodeURIComponent(JSON.stringify(cart));

  return true;
}

// ==============================
//  INITIAL LOAD
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartPage();
  updateCartCount();
});
