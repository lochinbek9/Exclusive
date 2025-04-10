const allProducts = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    discount: 40,
    img: "./images/joystick.png",
    originalPrice: 160,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    discount: 35,
    img: "./images/keyboard.png",
    originalPrice: 1160,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    discount: 30,
    img: "./images/monitor.png",
    originalPrice: 400,
  },
  {
    id: 4,
    name: "Gaming Chair",
    price: 375,
    discount: 25,
    img: "./images/chair.png",
    originalPrice: 500,
  },
  {
    id: 5,
    name: "RGB Liquid CPU Cooler",
    price: 160,
    discount: 0,
    img: "./images/cooler.png",
    originalPrice: 170,
  },
  {
    id: 6,
    name: "Pink Jacket",
    price: 260,
    discount: 0,
    img: "./images/jacket.png",
    originalPrice: 260,
  },
  {
    id: 7,
    name: "Designer Bag",
    price: 960,
    discount: 0,
    img: "./images/bag.png",
    originalPrice: 960,
  },
  {
    id: 8,
    name: "RGB CPU Cooler",
    price: 160,
    discount: 0,
    img: "./images/cooler.png",
    originalPrice: 160,
  },
  {
    id: 9,
    name: "Wooden Table",
    price: 360,
    discount: 0,
    img: "./images/bookself.png",
    originalPrice: 360,
  },
  {
    id: 10,
    name: "Cesar Dog Food",
    price: 100,
    discount: 0,
    img: "./images/dog-food.png",
    originalPrice: 100,
  },
  {
    id: 11,
    name: "Canon Camera",
    price: 360,
    discount: 0,
    img: "./images/camera.png",
    originalPrice: 360,
  },
  {
    id: 12,
    name: "Lenovo Laptop",
    price: 700,
    discount: 0,
    img: "./images/laptop.png",
    originalPrice: 700,
  },
  {
    id: 13,
    name: "Cosmetic Products",
    price: 500,
    discount: 0,
    img: "./images/cosmetics.png",
    originalPrice: 500,
  },
  {
    id: 14,
    name: "Kids Electric Car",
    price: 960,
    discount: 0,
    img: "./images/car.png",
    originalPrice: 960,
    isNew: true,
  },
  {
    id: 15,
    name: "Adidas Shoes",
    price: 160,
    discount: 0,
    img: "./images/shoes.png",
    originalPrice: 160,
  },
  {
    id: 16,
    name: "Gamepad",
    price: 660,
    discount: 0,
    img: "./images/gamepad.png",
    originalPrice: 660,
    isNew: true,
  },
  {
    id: 17,
    name: "Jacket",
    price: 660,
    discount: 0,
    img: "./images/jacket2.png",
    originalPrice: 660,
  },
];

const thisMonthProducts = [
  allProducts[5],
  allProducts[6],
  allProducts[7],
  allProducts[8],
];
const ourProducts = [
  allProducts[9],
  allProducts[10],
  allProducts[11],
  allProducts[12],
  allProducts[13],
  allProducts[14],
  allProducts[15],
  allProducts[16],
];

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    console.error("Error loading cart:", e);
    return [];
  }
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  } catch (e) {
    console.error("Error loading wishlist:", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCounts();
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCounts();
}

function updateCounts() {
  const cart = getCart();
  const wishlist = getWishlist();
  document
    .querySelectorAll(".header__right__section__count#cartCount")
    .forEach((el) => (el.textContent = cart.length));
  document
    .querySelectorAll(".header__right__section__count#wishlistCount")
    .forEach((el) => (el.textContent = wishlist.length));
}

function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const cart = getCart();
  const wishlist = getWishlist();
  container.innerHTML = "";
  products.forEach((p) => {
    const isInCart = cart.some((item) => item.id === p.id);
    const isLiked = wishlist.includes(p.id);
    container.innerHTML += `
      <div class="product" onclick="goToProduct(${p.id})">
        ${
          p.discount > 0
            ? `<span class="discount">-${p.discount}%</span>`
            : p.isNew
            ? `<span class="new__label">NEW</span>`
            : ""
        }
        <div class="icons">
          <span class="material-icons ${
            isLiked ? "liked" : ""
          }" onclick="toggleWishlist(event, ${p.id}, '${
      p.name
    }')">favorite_border</span>
          <span class="material-icons" onclick="goToProduct(${
            p.id
          })">visibility</span>
        </div>
        <img src="${p.img}" alt="${p.name}">
        <p class="price">$${p.price}</p>
        <div class="stars">★★★★★</div>
        <div class="${
          isInCart ? "remove__from__cart" : "add__to__cart"
        }" onclick="toggleCart(event, ${p.id}, '${p.name}', this)">${
      isInCart ? "Remove from Cart" : "Add to Cart"
    }</div>
      </div>
    `;
  });
}

function renderIndex() {
  renderProducts("productList", allProducts);
  renderProducts("thisMonthItems", thisMonthProducts);
  renderProducts("ourProductsItems", ourProducts);
  startCountdown();
  updateCounts();
}

let selectedColor = "Red";
let selectedSize = "S";
let quantity = 1;

function renderProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  document.getElementById("productName").textContent = product.name;
  document.getElementById("productTitle").textContent = product.name;
  document.getElementById("productPrice").textContent = `$${product.price}`;
  document.getElementById("mainImage").src = product.img;
  document.getElementById("mainImage").alt = `${product.name} Image`;

  const thumbnails = document.getElementById("thumbnails");
  thumbnails.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    thumbnails.innerHTML += `<img src="${product.img}" alt="${
      product.name
    } Thumbnail" class="${
      i === 0 ? "active" : ""
    }" onclick="changeMainImage(this)">`;
  }

  const wishlist = getWishlist();
  const wishlistBtn = document.getElementById("wishlistBtn");
  wishlistBtn.innerHTML = `<span class="material-icons">${
    wishlist.includes(productId) ? "favorite" : "favorite_border"
  }</span>`;
  wishlistBtn.onclick = (event) =>
    toggleWishlist(event, productId, product.name, wishlistBtn);
  if (wishlist.includes(productId)) wishlistBtn.classList.add("liked");

  // Miqdor tugmalari uchun hodisalar
  document.getElementById("quantity").textContent = quantity;
  const increaseBtn = document.querySelector(
    ".product__details__details__buy__section__quantity__button:nth-child(3)"
  );
  const decreaseBtn = document.querySelector(
    ".product__details__details__buy__section__quantity__button:nth-child(1)"
  );
  if (increaseBtn) increaseBtn.onclick = increaseQuantity;
  if (decreaseBtn) decreaseBtn.onclick = decreaseQuantity;

  renderProducts("relatedItems", allProducts);
  updateCounts();
}

function changeMainImage(thumb) {
  document
    .querySelectorAll(".product__details__gallery__thumbnails img")
    .forEach((img) => img.classList.remove("active"));
  thumb.classList.add("active");
  document.getElementById("mainImage").src = thumb.src;
}

function increaseQuantity() {
  quantity++;
  document.getElementById("quantity").textContent = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").textContent = quantity;
  }
}

function selectColor(element) {
  document
    .querySelectorAll(".product__details__details__options__colors__circle")
    .forEach((circle) => circle.classList.remove("selected"));
  element.classList.add("selected");
  selectedColor = element.dataset.color;
}

function selectSize(element) {
  document
    .querySelectorAll(".product__details__details__options__sizes__button")
    .forEach((btn) => btn.classList.remove("selected"));
  element.classList.add("selected");
  selectedSize = element.textContent;
}

function toggleWishlist(event, id, name, btn) {
  event.stopPropagation();
  const wishlist = getWishlist();
  const isLiked = wishlist.includes(id);
  if (isLiked) {
    wishlist.splice(wishlist.indexOf(id), 1);
    if (btn) {
      btn.classList.remove("liked");
      btn.querySelector(".material-icons").textContent = "favorite_border";
    }
    alert(`${name} removed from wishlist!`);
  } else {
    wishlist.push(id);
    if (btn) {
      btn.classList.add("liked");
      btn.querySelector(".material-icons").textContent = "favorite";
    }
    alert(`${name} added to wishlist!`);
  }
  saveWishlist(wishlist);
  refreshPage();
}

function toggleCart(event, id, name, button) {
  event.stopPropagation();
  const cart = getCart();
  const itemIndex = cart.findIndex(
    (item) =>
      item.id === id &&
      item.color === selectedColor &&
      item.size === selectedSize
  );
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    button.classList.remove("remove__from__cart");
    button.classList.add("add__to__cart");
    button.textContent = "Add to Cart";
    alert(`${name} removed from cart!`);
  } else {
    cart.push({ id, quantity: 1, color: selectedColor, size: selectedSize });
    button.classList.remove("add__to__cart");
    button.classList.add("remove__from__cart");
    button.textContent = "Remove from Cart";
    alert(`${name} (1 ${selectedColor} ${selectedSize}) added to cart!`);
  }
  saveCart(cart);
  refreshPage();
}

function addToCartFromProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find(
    (item) =>
      item.id === productId &&
      item.color === selectedColor &&
      item.size === selectedSize
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  }
  saveCart(cart);
  alert(
    `${quantity} ${selectedColor} ${selectedSize} ${product.name}${
      quantity > 1 ? "s" : ""
    } added to cart!`
  );
  quantity = 1;
  document.getElementById("quantity").textContent = quantity;
  refreshPage();
}

function buyNow() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find(
    (item) =>
      item.id === productId &&
      item.color === selectedColor &&
      item.size === selectedSize
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  }
  saveCart(cart);
  alert(
    `${quantity} ${selectedColor} ${selectedSize} ${product.name}${
      quantity > 1 ? "s" : ""
    } added to cart! Proceeding to checkout...`
  );
  window.location.href = "cart.html";
}

function renderWishlist() {
  const wishlist = getWishlist();
  const container = document.getElementById("wishlistItems");
  if (!container) return;
  container.innerHTML = "";
  wishlist.forEach((id) => {
    const product = allProducts.find((p) => p.id === id);
    if (product) {
      container.innerHTML += `
        <div class="wishlist__item">
          <span class="material-icons remove__from__wishlist" onclick="removeFromWishlist(${product.id}, '${product.name}')">close</span>
          <img src="${product.img}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p class="price">$${product.price}</p>
          <div class="add__to__cart" onclick="addToCart(${product.id}, '${product.name}', this)">Add to Cart</div>
        </div>
      `;
    }
  });
  renderProducts("justForYouItems", allProducts);
  updateCounts();
}

function removeFromWishlist(id, name) {
  const wishlist = getWishlist();
  wishlist.splice(wishlist.indexOf(id), 1);
  saveWishlist(wishlist);
  alert(`${name} removed from wishlist!`);
  renderWishlist();
}

function addToCart(id, name, button) {
  const cart = getCart();
  if (
    !cart.some(
      (item) =>
        item.id === id &&
        item.color === selectedColor &&
        item.size === selectedSize
    )
  ) {
    cart.push({ id, quantity: 1, color: selectedColor, size: selectedSize });
    saveCart(cart);
    alert(`${name} (1 ${selectedColor} ${selectedSize}) added to cart!`);
    button.classList.remove("add__to__cart");
    button.classList.add("remove__from__cart");
    button.textContent = "Remove from Cart";
  }
  refreshPage();
}

function moveAllToCart() {
  const wishlist = getWishlist();
  const cart = getCart();
  let addedCount = 0;
  wishlist.forEach((id) => {
    if (
      !cart.some(
        (item) =>
          item.id === id &&
          item.color === selectedColor &&
          item.size === selectedSize
      )
    ) {
      cart.push({ id, quantity: 1, color: selectedColor, size: selectedSize });
      addedCount++;
    }
  });
  saveCart(cart);
  saveWishlist([]);
  alert(`${addedCount} product${addedCount > 1 ? "s" : ""} moved to cart!`);
  renderWishlist();
}

let couponDiscount = 0;

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  if (!container) return;
  container.innerHTML = "";
  let subtotal = 0;
  cart.forEach((item) => {
    const product = allProducts.find((p) => p.id === item.id);
    if (product) {
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      container.innerHTML += `
        <div class="cart__item">
          <span class="material-icons remove__from__cart" onclick="removeFromCart(${product.id}, '${product.name}', '${item.color}', '${item.size}')">close</span>
          <img src="${product.img}" alt="${product.name}">
          <div>
            <h4>${product.name} (${item.color}, ${item.size})</h4>
            <p class="price">$${product.price} x ${item.quantity} = $${itemTotal}</p>
            <div class="quantity">
              <button onclick="decreaseQuantity(${product.id}, '${item.color}', '${item.size}')">-</button>
              <span>${item.quantity}</span>
              <button onclick="increaseQuantity(${product.id}, '${item.color}', '${item.size}')">+</button>
            </div>
          </div>
        </div>
      `;
    }
  });

  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping - couponDiscount;
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  renderProducts("justForYouItems", allProducts);
  updateCounts();
}

function removeFromCart(id, name, color, size) {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    (item) => item.id === id && item.color === color && item.size === size
  );
  if (itemIndex > -1) {
    const item = cart[itemIndex];
    cart.splice(itemIndex, 1);
    saveCart(cart);
    alert(
      `${item.quantity} ${color} ${size} ${name}${
        item.quantity > 1 ? "s" : ""
      } removed from cart!`
    );
    renderCart();
  }
}

function increaseQuantity(id, color, size) {
  const cart = getCart();
  const item = cart.find(
    (item) => item.id === id && item.color === color && item.size === size
  );
  if (item) {
    item.quantity++;
    saveCart(cart);
    renderCart();
  } else {
    quantity++;
    document.getElementById("quantity").textContent = quantity;
  }
}

function decreaseQuantity(id, color, size) {
  const cart = getCart();
  const item = cart.find(
    (item) => item.id === id && item.color === color && item.size === size
  );
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart.splice(
        cart.findIndex(
          (i) => i.id === id && i.color === color && i.size === size
        ),
        1
      );
    }
    saveCart(cart);
    renderCart();
  } else if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").textContent = quantity;
  }
}

function applyCoupon() {
  const couponCode = document.getElementById("couponInput").value;
  if (couponCode === "SAVE10") {
    couponDiscount = 10;
    alert("Coupon applied successfully! You saved $10.");
  } else {
    couponDiscount = 0;
    alert("Invalid coupon code!");
  }
  renderCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  saveCart([]);
  renderCart();
}

function goToProduct(id) {
  const product = allProducts.find((p) => p.id === id);
  if (product) {
    window.location.href = `product.html?id=${id}&name=${encodeURIComponent(
      product.name
    )}&price=${product.price}&img=${encodeURIComponent(product.img)}&discount=${
      product.discount
    }&originalPrice=${product.originalPrice}`;
  }
}

function prevSlide(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slideWidth =
    container.querySelector(".product")?.offsetWidth + 20 ||
    container.querySelector(".related__item")?.offsetWidth + 20 ||
    container.querySelector(".just__for__you__item")?.offsetWidth + 20;
  const totalSlides = Math.ceil(container.children.length / 4);
  let currentSlide = parseInt(container.dataset.slide) || 0;
  currentSlide--;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  container.style.transition = "transform 0.5s ease";
  container.style.transform = `translateX(-${currentSlide * slideWidth * 4}px)`;
  container.dataset.slide = currentSlide;
}

function nextSlide(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slideWidth =
    container.querySelector(".product")?.offsetWidth + 20 ||
    container.querySelector(".related__item")?.offsetWidth + 20 ||
    container.querySelector(".just__for__you__item")?.offsetWidth + 20;
  const totalSlides = Math.ceil(container.children.length / 4);
  let currentSlide = parseInt(container.dataset.slide) || 0;
  currentSlide++;
  if (currentSlide >= totalSlides) currentSlide = 0;
  container.style.transition = "transform 0.5s ease";
  container.style.transform = `translateX(-${currentSlide * slideWidth * 4}px)`;
  container.dataset.slide = currentSlide;
}

function startCountdown() {
  let hours = 23,
    minutes = 59,
    seconds = 59;
  setInterval(() => {
    if (seconds > 0) seconds--;
    else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      hours = 23;
      minutes = 59;
      seconds = 59;
    }
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }, 1000);
}

function searchProducts(event) {
  const query = event.target.value.toLowerCase();
  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
  renderProducts("productList", filtered);
  renderProducts("thisMonthItems", filtered.slice(0, 4));
  renderProducts("ourProductsItems", filtered.slice(0, 8));
}

function refreshPage() {
  const path = window.location.pathname;
  if (path.includes("index.html") || path === "/" || path === "") renderIndex();
  if (path.includes("product.html")) renderProductDetails();
  if (path.includes("wishlist.html")) renderWishlist();
  if (path.includes("cart.html")) renderCart();
}

document.addEventListener("DOMContentLoaded", refreshPage);
