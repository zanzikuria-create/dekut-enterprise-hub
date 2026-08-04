// ======================================================
// DeKUT Nexus — Shared App Utilities
// Cart storage + header cart badge.
// Loaded on every page, before any page-specific script.
// ======================================================

const CART_KEY = "dekutCart";

// ------------------------------------------------------
// Cart storage (localStorage), shape: [{ id, qty }]
// ------------------------------------------------------

function getCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Could not read cart from storage:", err);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
        console.error("Could not save cart to storage:", err);
    }
    updateCartCount();
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

function getCartCount() {
    return getCart().reduce((total, item) => total + item.qty, 0);
}

// ------------------------------------------------------
// Header cart badge
// ------------------------------------------------------

function updateCartCount() {
    const badges = document.querySelectorAll(".cart-count");
    const count = getCartCount();

    badges.forEach(badge => {
        badge.textContent = count;
    });
}

// ------------------------------------------------------
// Small on-screen confirmation when something is added
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

document.addEventListener("DOMContentLoaded", updateCartCount);
