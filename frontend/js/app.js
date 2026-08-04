// ======================================================
// DeKUT Nexus — Shared App Utilities
// Cart, wishlist, orders, settings/dark-mode and small
// UI helpers shared by every page. Loaded before any
// page-specific script.
// ======================================================

const CART_KEY = "dekutCart";
const WISHLIST_KEY = "dekutWishlist";
const ORDERS_KEY = "dekutOrders";
const SETTINGS_KEY = "dekutSettings";

// ------------------------------------------------------
// Generic storage helpers
// ------------------------------------------------------

function readStore(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
        console.error(`Could not read "${key}" from storage:`, err);
        return fallback;
    }
}

function writeStore(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error(`Could not save "${key}" to storage:`, err);
    }
}

// ------------------------------------------------------
// Cart storage, shape: [{ id, qty }]
// ------------------------------------------------------

function getCart() {
    return readStore(CART_KEY, []);
}

function saveCart(cart) {
    writeStore(CART_KEY, cart);
    updateHeaderBadges();
}

function addToCart(id, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => String(item.id) === String(id));

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: id, qty: qty });
    }

    saveCart(cart);
    return cart;
}

function removeFromCart(id) {
    const cart = getCart().filter(item => String(item.id) !== String(id));
    saveCart(cart);
    return cart;
}

function setCartQty(id, qty) {
    let cart = getCart();

    if (qty <= 0) {
        cart = cart.filter(item => String(item.id) !== String(id));
    } else {
        const existing = cart.find(item => String(item.id) === String(id));
        if (existing) {
            existing.qty = qty;
        } else {
            cart.push({ id: id, qty: qty });
        }
    }

    saveCart(cart);
    return cart;
}

function clearCart() {
    saveCart([]);
}

function getCartCount() {
    return getCart().reduce((total, item) => total + item.qty, 0);
}

// Cart items resolved against the product catalogue, with line totals
function getCartDetails() {
    return getCart()
        .map(item => {
            const product = typeof getProductById === "function" ? getProductById(item.id) : null;
            if (!product) return null;
            return {
                product,
                qty: item.qty,
                lineTotal: (product.price || 0) * item.qty,
            };
        })
        .filter(Boolean);
}

function getCartSubtotal() {
    return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

// ------------------------------------------------------
// Wishlist storage, shape: [id, id, ...]
// ------------------------------------------------------

function getWishlist() {
    return readStore(WISHLIST_KEY, []);
}

function saveWishlist(list) {
    writeStore(WISHLIST_KEY, list);
    updateHeaderBadges();
}

function isInWishlist(id) {
    return getWishlist().some(itemId => String(itemId) === String(id));
}

function toggleWishlist(id) {
    let list = getWishlist();
    if (isInWishlist(id)) {
        list = list.filter(itemId => String(itemId) !== String(id));
    } else {
        list.push(id);
    }
    saveWishlist(list);
    return isInWishlist(id);
}

function removeFromWishlist(id) {
    saveWishlist(getWishlist().filter(itemId => String(itemId) !== String(id)));
}

function clearWishlist() {
    saveWishlist([]);
}

function getWishlistDetails() {
    return getWishlist()
        .map(id => (typeof getProductById === "function" ? getProductById(id) : null))
        .filter(Boolean);
}

// ------------------------------------------------------
// Orders storage, shape:
// [{ id, date, items:[{id,name,price,qty,image}], subtotal,
//    deliveryFee, total, customer:{name,phone,location,notes},
//    payment, status }]
// ------------------------------------------------------

function getOrders() {
    return readStore(ORDERS_KEY, []);
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    writeStore(ORDERS_KEY, orders);
    updateHeaderBadges();
    return order;
}

function getOrderById(id) {
    return getOrders().find(order => String(order.id) === String(id));
}

function generateOrderId() {
    const now = new Date();
    const stamp = now.getFullYear().toString().slice(2) +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `DKN-${stamp}-${rand}`;
}

function clearOrders() {
    writeStore(ORDERS_KEY, []);
    updateHeaderBadges();
}

// ------------------------------------------------------
// Settings storage (profile + preferences, incl. dark mode)
// ------------------------------------------------------

const DEFAULT_SETTINGS = {
    name: "Zanzi",
    email: "",
    phone: "",
    notifications: true,
    darkMode: false,
};

function getSettings() {
    return { ...DEFAULT_SETTINGS, ...readStore(SETTINGS_KEY, {}) };
}

function saveSettings(partial) {
    const merged = { ...getSettings(), ...partial };
    writeStore(SETTINGS_KEY, merged);
    return merged;
}

// ------------------------------------------------------
// Dark mode
// ------------------------------------------------------

function applyDarkMode(isDark) {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    const toggles = document.querySelectorAll(".dark-mode-toggle i");
    toggles.forEach(icon => {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
}

function toggleDarkMode() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = !isDark;
    saveSettings({ darkMode: next });
    applyDarkMode(next);
}

function initDarkMode() {
    const settings = getSettings();
    applyDarkMode(!!settings.darkMode);
}

// ------------------------------------------------------
// Header: cart / wishlist badges + dark mode toggle button
// injected automatically into any page with a .right-header
// ------------------------------------------------------

function updateHeaderBadges() {
    document.querySelectorAll(".cart-count").forEach(badge => {
        badge.textContent = getCartCount();
    });
    document.querySelectorAll(".wishlist-count-badge").forEach(badge => {
        badge.textContent = getWishlist().length;
    });

    const ordersCountEl = document.getElementById("ordersCount");
    if (ordersCountEl) ordersCountEl.textContent = getOrders().length;

    const wishlistCountEl = document.getElementById("wishlistCount");
    if (wishlistCountEl) wishlistCountEl.textContent = getWishlist().length;
}

function wireCartButton() {
    const cartBtn = document.querySelector(".cart-btn");
    if (!cartBtn) return;

    const inPagesFolder = window.location.pathname.includes("/pages/");
    const target = inPagesFolder ? "cart.html" : "pages/cart.html";

    cartBtn.style.cursor = "pointer";
    cartBtn.addEventListener("click", () => {
        window.location.href = target;
    });
}

function injectDarkModeToggle() {
    const rightHeader = document.querySelector(".right-header");
    if (!rightHeader || rightHeader.querySelector(".dark-mode-toggle")) return;

    const btn = document.createElement("button");
    btn.className = "dark-mode-toggle";
    btn.setAttribute("aria-label", "Toggle dark mode");
    btn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    btn.addEventListener("click", toggleDarkMode);

    rightHeader.insertBefore(btn, rightHeader.firstChild);
}

// ------------------------------------------------------
// Wishlist heart + quick-add injected onto every product
// card that links to product.html?id=, site-wide.
// ------------------------------------------------------

function getIdFromViewBtn(card) {
    const link = card.querySelector('a[href*="product.html?id="]');
    if (!link) return null;
    const match = link.getAttribute("href").match(/id=(\d+)/);
    return match ? match[1] : null;
}

function decorateProductCards(root = document) {
    const cards = root.querySelectorAll(".product-card");

    cards.forEach(card => {
        if (card.querySelector(".wishlist-toggle")) return; // already decorated

        const id = getIdFromViewBtn(card);
        if (!id) return;

        card.classList.add("has-wishlist-toggle");

        const heart = document.createElement("button");
        heart.type = "button";
        heart.className = "wishlist-toggle";
        heart.setAttribute("aria-label", "Toggle wishlist");
        heart.dataset.id = id;
        heart.innerHTML = `<i class="${isInWishlist(id) ? "fa-solid" : "fa-regular"} fa-heart"></i>`;

        if (isInWishlist(id)) heart.classList.add("active");

        heart.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nowActive = toggleWishlist(id);
            heart.classList.toggle("active", nowActive);
            heart.querySelector("i").className = nowActive ? "fa-solid fa-heart" : "fa-regular fa-heart";
            const product = typeof getProductById === "function" ? getProductById(id) : null;
            showToast(nowActive
                ? `${product ? product.name : "Item"} added to wishlist`
                : `${product ? product.name : "Item"} removed from wishlist`);
        });

        card.appendChild(heart);
    });
}

// ------------------------------------------------------
// Toast notification
// ------------------------------------------------------

function showToast(message) {
    let toast = document.getElementById("dekutToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "dekutToast";
        toast.className = "dekut-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// ------------------------------------------------------
// Currency helper
// ------------------------------------------------------

function formatKsh(amount) {
    return "KSh " + Number(amount || 0).toLocaleString("en-KE", { maximumFractionDigits: 2 });
}

// ------------------------------------------------------
// Shared receipt markup — used by cart.js (right after
// checkout) and orders.js (viewing order history)
// ------------------------------------------------------

function buildReceiptHTML(order) {
    const itemRows = order.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${formatKsh(item.price)}</td>
            <td>${formatKsh(item.price * item.qty)}</td>
        </tr>
    `).join("");

    return `
        <div class="receipt" id="receiptPrintArea">
            <div class="receipt-header">
                <h2>DeKUT Nexus</h2>
                <p>Official Receipt</p>
            </div>

            <div class="receipt-meta">
                <div><strong>Order #</strong><span>${order.id}</span></div>
                <div><strong>Date</strong><span>${new Date(order.date).toLocaleString("en-KE")}</span></div>
                <div><strong>Status</strong><span class="status-pill">${order.status}</span></div>
                <div><strong>Payment</strong><span>${order.payment}</span></div>
            </div>

            <div class="receipt-customer">
                <strong>Delivered to:</strong>
                <p>${order.customer.name} — ${order.customer.phone}</p>
                <p>${order.customer.location}</p>
                ${order.customer.notes ? `<p class="notes">Note: ${order.customer.notes}</p>` : ""}
            </div>

            <table class="receipt-table">
                <thead>
                    <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                </thead>
                <tbody>
                    ${itemRows}
                </tbody>
            </table>

            <div class="receipt-totals">
                <div><span>Subtotal</span><span>${formatKsh(order.subtotal)}</span></div>
                <div><span>Delivery</span><span>${formatKsh(order.deliveryFee)}</span></div>
                <div class="grand-total"><span>Total</span><span>${formatKsh(order.total)}</span></div>
            </div>

            <p class="receipt-footer">Thank you for supporting DeKUT Nexus — Quality Products. Proudly DeKUT.</p>
        </div>
    `;
}

// ------------------------------------------------------
// Init on every page
// ------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    injectDarkModeToggle();
    wireCartButton();
    updateHeaderBadges();
    decorateProductCards();
});
