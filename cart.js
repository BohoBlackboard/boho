// -----------------------------------------------------------
// CART SYSTEM FOR BOHO BLACKBOARD
// -----------------------------------------------------------

// Load existing cart
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// -----------------------------------------------------------
// Update Cart Count in Navbar
// -----------------------------------------------------------
function updateCartCount() {
  const countBox = document.getElementById("cart-count");
  if (countBox) {
    countBox.textContent = cart.length;
  }
}
updateCartCount();

// -----------------------------------------------------------
// Update Total (Cart Page)
// -----------------------------------------------------------
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalBox = document.getElementById("cart-total");

  if (totalBox) {
    totalBox.textContent = "R" + total;
  }
}

// -----------------------------------------------------------
// Add to Cart
// -----------------------------------------------------------
function addToCart(productName, price, icon, code) {
  cart.push({ productName, price, icon, code });
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert(productName + " added to cart!");
}

// -----------------------------------------------------------
// Remove Item
// -----------------------------------------------------------
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  renderCart();
  updateTotal();
}

// -----------------------------------------------------------
// Render Cart Page (Small Icons, Contained Layout)
// -----------------------------------------------------------
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return; // safety check

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    updateTotal();
    return;
  }

  container.innerHTML = "";

  cart.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = "cart-item";

    box.innerHTML = `
      <img src="${item.icon}" class="cart-item-img" alt="${item.productName}">

      <div class="cart-info">
        <strong>${item.productName}</strong><br>
        R${item.price}
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    container.appendChild(box);
  });

  updateTotal();
}

// -----------------------------------------------------------
// Checkout — Save email + redirect (PayFast)
// -----------------------------------------------------------
function checkout() {
  const emailInput = document.getElementById("customer-email");
  if (!emailInput) return;

  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Save email
  localStorage.setItem("customer_email", email);

  // Redirect to PayFast
  window.location.href = "https://www.payfast.co.za/eng/process";
}

// -----------------------------------------------------------
// INIT
// -----------------------------------------------------------
renderCart();
updateTotal();
