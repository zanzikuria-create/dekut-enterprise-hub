// ======================================================
// DeKUT Nexus — Shared App Utilities
// Cart, Wishlist, Orders, Theme (dark mode) storage,
// header/side-menu wiring, and small UI helpers.
// Loaded on every page, before any page-specific script.
// ======================================================

const CART_KEY = "dekutCart";
const WISHLIST_KEY = "dekutWishlist";
const ORDERS_KEY = "dekutOrders";
const THEME_KEY = "dekutTheme";
const DELIVERY_FEE = 100;

// ======================================================
// CURRENCY / FORMAT HELPERS
// ======================================================

function formatKES(amount) {
    const value = Number(amount) || 0;
    return "KSh " + value.toLocaleString("en-KE", { maximumFractionDigits: 0 });
}

function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });
}

// ======================================================
// CART  — storage shape: [{ id, qty }]
// ======================================================

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
    updateHeaderCounts();
    window.dispatchEvent(new CustomEvent("dekut:cart-changed"));
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

// Joins the stored cart with live PRODUCTS data (skips products that
// no longer exist). Each row also carries a lineTotal.
function getCartDetails() {
    if (typeof PRODUCTS === "undefined") return [];
    return getCart()
        .map(item => {
            const product = getProductById(item.id);
            if (!product) return null;
            return {
                product: product,
                qty: item.qty,
                lineTotal: (product.price || 0) * item.qty
            };
        })
        .filter(Boolean);
}

function getCartSubtotal() {
    return getCartDetails().reduce((sum, row) => sum + row.lineTotal, 0);
}

// ======================================================
// WISHLIST — storage shape: [id, id, ...]
// ======================================================

function getWishlist() {
    try {
        const raw = localStorage.getItem(WISHLIST_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Could not read wishlist from storage:", err);
        return [];
    }
}

function saveWishlist(list) {
    try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    } catch (err) {
        console.error("Could not save wishlist to storage:", err);
    }
    updateHeaderCounts();
    refreshWishlistButtons();
}

function isInWishlist(id) {
    return getWishlist().some(w => String(w) === String(id));
}

function toggleWishlist(id) {
    let list = getWishlist();
    if (isInWishlist(id)) {
        list = list.filter(w => String(w) !== String(id));
    } else {
        list.push(id);
    }
    saveWishlist(list);
    return isInWishlist(id);
}

function removeFromWishlist(id) {
    saveWishlist(getWishlist().filter(w => String(w) !== String(id)));
}

function getWishlistDetails() {
    if (typeof PRODUCTS === "undefined") return [];
    return getWishlist()
        .map(id => getProductById(id))
        .filter(Boolean);
}

// ======================================================
// ORDERS — created at checkout, storage shape: [order, ...]
// ======================================================

function generateOrderId() {
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `DKT-${stamp}-${rand}`;
}

function getOrders() {
    try {
        const raw = localStorage.getItem(ORDERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Could not read orders from storage:", err);
        return [];
    }
}

function saveOrders(orders) {
    try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (err) {
        console.error("Could not save orders to storage:", err);
    }
    updateHeaderCounts();
}

function getOrderById(id) {
    return getOrders().find(o => o.id === id);
}

// Creates an order from the current cart, saves it, and empties the cart.
// customer = { name, phone, location, notes }
function placeOrder(customer) {
    const items = getCartDetails().map(row => ({
        id: row.product.id,
        name: row.product.name,
        price: row.product.price,
        image: row.product.image,
        qty: row.qty,
        lineTotal: row.lineTotal
    }));

    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const deliveryFee = items.length ? DELIVERY_FEE : 0;

    const order = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        items: items,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: subtotal + deliveryFee,
        customer: customer,
        status: "Processing"
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    clearCart();

    return order;
}

// ======================================================
// THEME (DARK MODE)
// ======================================================

function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle").forEach(toggle => {
        toggle.checked = theme === "dark";
    });
}

function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
}

function toggleTheme() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
}

// ======================================================
// HEADER: cart / wishlist / orders badge counts
// ======================================================

function updateHeaderCounts() {
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = getCartCount();
    });
    document.querySelectorAll(".wishlist-count").forEach(el => {
        el.textContent = getWishlist().length;
    });
    document.querySelectorAll(".orders-count").forEach(el => {
        el.textContent = getOrders().length;
    });
}

// ======================================================
// SIDE MENU wiring (open/close). Safe if elements are absent.
// ======================================================

function initSideMenu() {
    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!openMenu || !closeMenu || !menuOverlay) return;

    openMenu.addEventListener("click", () => {
        menuOverlay.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
    });

    menuOverlay.addEventListener("click", (e) => {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove("active");
        }
    });

    // Dark mode toggle switch living inside the side menu
    const menuToggle = menuOverlay.querySelector(".theme-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("change", () => {
            setTheme(menuToggle.checked ? "dark" : "light");
        });
    }
}

// ======================================================
// WISHLIST HEART BUTTONS
// Auto-injected onto any .product-card that has a
// "product.html?id=..." link, on every page.
// ======================================================

function extractProductId(card) {
    const link = card.querySelector('a[href*="product.html?id="]');
    if (!link) return null;
    const match = link.getAttribute("href").match(/id=(\d+)/);
    return match ? match[1] : null;
}

function initWishlistButtons() {
    document.querySelectorAll(".product-card").forEach(card => {
        if (card.querySelector(".wishlist-heart")) return; // already added

        const id = extractProductId(card);
        if (!id) return;

        const btn = document.createElement("button");
        btn.className = "wishlist-heart";
        btn.type = "button";
        btn.setAttribute("aria-label", "Toggle wishlist");
        btn.dataset.productId = id;
        btn.innerHTML = '<i class="fa-solid fa-heart"></i>';

        card.style.position = "relative";
        card.prepend(btn);

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nowIn = toggleWishlist(id);
            showToast(nowIn ? "Added to wishlist" : "Removed from wishlist");
        });
    });

    refreshWishlistButtons();
}

function refreshWishlistButtons() {
    document.querySelectorAll(".wishlist-heart").forEach(btn => {
        const id = btn.dataset.productId;
        btn.classList.toggle("active", isInWishlist(id));
    });
}

// ======================================================
// TOAST NOTIFICATION
// ======================================================

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

// ======================================================
// INIT — runs on every page
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getTheme());
    updateHeaderCounts();
    initSideMenu();
    initWishlistButtons();
});