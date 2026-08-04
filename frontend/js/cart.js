// ======================================================
// DeKUT Nexus — Cart Page
// Three states: cart view -> checkout form -> receipt.
// ======================================================

const ASSET_BASE = "../";
const DELIVERY_FEE = 150;

const cartViewEl = document.getElementById("cartView");
const checkoutViewEl = document.getElementById("checkoutView");
const receiptViewEl = document.getElementById("receiptView");

let selectedPayment = "Cash on Delivery";

renderCartView();

// ------------------------------------------------------
// STATE 1: Cart view
// ------------------------------------------------------

function renderCartView() {
    showOnly("cartView");

    const items = getCartDetails();

    if (items.length === 0) {
        cartViewEl.innerHTML = `
            <div class="panel empty-state">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Browse the catalogue and add something you like.</p>
                <a href="catalogue.html" class="primary-btn">Browse Products</a>
            </div>
        `;
        return;
    }

    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const total = subtotal + DELIVERY_FEE;

    cartViewEl.innerHTML = `
        <div class="cart-layout">
            <div class="cart-items">
                ${items.map(rowHTML).join("")}
            </div>

            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-row"><span>Subtotal</span><span>${formatKsh(subtotal)}</span></div>
                <div class="summary-row"><span>Delivery</span><span>${formatKsh(DELIVERY_FEE)}</span></div>
                <div class="summary-row total"><span>Total</span><span>${formatKsh(total)}</span></div>
                <button class="primary-btn" id="checkoutBtn">
                    <i class="fa-solid fa-lock"></i>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;

    cartViewEl.querySelectorAll(".qty-minus").forEach(btn =>
        btn.addEventListener("click", () => stepQty(btn.dataset.id, -1)));

    cartViewEl.querySelectorAll(".qty-plus").forEach(btn =>
        btn.addEventListener("click", () => stepQty(btn.dataset.id, 1)));

    cartViewEl.querySelectorAll(".qty-input").forEach(input =>
        input.addEventListener("change", () => {
            let value = parseInt(input.value, 10);
            if (isNaN(value) || value < 1) value = 1;
            setCartQty(input.dataset.id, value);
            renderCartView();
        }));

    cartViewEl.querySelectorAll(".remove-item-btn").forEach(btn =>
        btn.addEventListener("click", () => {
            const product = getProductById(btn.dataset.id);
            removeFromCart(btn.dataset.id);
            showToast(`Removed ${product ? product.name : "item"} from cart`);
            renderCartView();
        }));

    document.getElementById("checkoutBtn").addEventListener("click", renderCheckoutView);
}

function rowHTML(item) {
    const p = item.product;
    return `
        <div class="cart-item">
            <img src="${ASSET_BASE}${p.image}" alt="${p.name}">
            <div class="cart-item-info">
                <h3>${p.name}</h3>
                <div class="unit-price">${p.priceDisplay}</div>
                <div class="cart-item-qty">
                    <button type="button" class="qty-minus" data-id="${p.id}">−</button>
                    <input type="number" class="qty-input" data-id="${p.id}" value="${item.qty}" min="1" max="99">
                    <button type="button" class="qty-plus" data-id="${p.id}">+</button>
                </div>
            </div>
            <div></div>
            <div class="cart-item-total">
                <span class="line-total">${formatKsh(item.lineTotal)}</span>
                <button type="button" class="remove-item-btn" data-id="${p.id}">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `;
}

function stepQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => String(i.id) === String(id));
    const current = item ? item.qty : 0;
    setCartQty(id, Math.max(1, current + delta));
    renderCartView();
}

// ------------------------------------------------------
// STATE 2: Checkout form
// ------------------------------------------------------

function renderCheckoutView() {
    showOnly("checkoutView");

    const items = getCartDetails();
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const total = subtotal + DELIVERY_FEE;
    const settings = getSettings();

    checkoutViewEl.innerHTML = `
        <div class="checkout-steps">
            <span>1. Cart</span>
            <span class="active">2. Delivery &amp; Payment</span>
            <span>3. Receipt</span>
        </div>

        <div class="cart-layout">
            <div class="panel">
                <h3 style="margin-bottom:18px;color:#1B5E20;">Delivery Details</h3>

                <div class="form-field">
                    <label for="custName">Full Name</label>
                    <input type="text" id="custName" value="${settings.name || ""}" placeholder="e.g. Jane Wanjiru">
                    <span class="form-error">Please enter your name.</span>
                </div>

                <div class="form-row">
                    <div class="form-field">
                        <label for="custPhone">Phone Number</label>
                        <input type="tel" id="custPhone" value="${settings.phone || ""}" placeholder="07XX XXX XXX">
                        <span class="form-error">Please enter a valid phone number.</span>
                    </div>
                    <div class="form-field">
                        <label for="custLocation">Delivery Location</label>
                        <input type="text" id="custLocation" placeholder="e.g. Hostel C, DeKUT">
                        <span class="form-error">Please enter a delivery location.</span>
                    </div>
                </div>

                <div class="form-field">
                    <label for="custNotes">Notes (optional)</label>
                    <textarea id="custNotes" rows="2" placeholder="Any delivery instructions..."></textarea>
                </div>

                <h3 style="margin:24px 0 14px;color:#1B5E20;">Payment Method</h3>

                <div class="payment-options">
                    <div class="payment-option selected" data-method="Cash on Delivery">
                        <i class="fa-solid fa-money-bill-wave"></i>
                        Cash on Delivery
                    </div>
                    <div class="payment-option" data-method="M-Pesa">
                        <i class="fa-solid fa-mobile-screen"></i>
                        M-Pesa
                    </div>
                    <div class="payment-option" data-method="Card">
                        <i class="fa-solid fa-credit-card"></i>
                        Card
                    </div>
                </div>
            </div>

            <div class="cart-summary">
                <h3>Order Summary</h3>
                ${items.map(i => `
                    <div class="summary-row"><span>${i.product.name} × ${i.qty}</span><span>${formatKsh(i.lineTotal)}</span></div>
                `).join("")}
                <div class="summary-row"><span>Delivery</span><span>${formatKsh(DELIVERY_FEE)}</span></div>
                <div class="summary-row total"><span>Total</span><span>${formatKsh(total)}</span></div>
                <button class="primary-btn" id="placeOrderBtn">
                    <i class="fa-solid fa-check"></i>
                    Place Order
                </button>
                <button class="secondary-btn" id="backToCartBtn" style="width:100%;margin-top:10px;">
                    Back to Cart
                </button>
            </div>
        </div>
    `;

    selectedPayment = "Cash on Delivery";

    checkoutViewEl.querySelectorAll(".payment-option").forEach(opt => {
        opt.addEventListener("click", () => {
            checkoutViewEl.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            selectedPayment = opt.dataset.method;
        });
    });

    document.getElementById("backToCartBtn").addEventListener("click", renderCartView);
    document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
}

function placeOrder() {
    const nameEl = document.getElementById("custName");
    const phoneEl = document.getElementById("custPhone");
    const locationEl = document.getElementById("custLocation");
    const notesEl = document.getElementById("custNotes");

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const location = locationEl.value.trim();

    let valid = true;

    toggleFieldError(nameEl, name.length === 0);
    toggleFieldError(phoneEl, !/^[\d+\s-]{7,15}$/.test(phone));
    toggleFieldError(locationEl, location.length === 0);

    valid = ![nameEl, phoneEl, locationEl].some(el => el.closest(".form-field").classList.contains("invalid"));

    if (!valid) {
        showToast("Please fix the highlighted fields");
        return;
    }

    const items = getCartDetails();
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const total = subtotal + DELIVERY_FEE;

    const order = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        items: items.map(i => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price || 0,
            qty: i.qty,
            image: i.product.image,
        })),
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total,
        customer: {
            name,
            phone,
            location,
            notes: notesEl.value.trim(),
        },
        payment: selectedPayment,
        status: "Processing",
    };

    saveOrder(order);
    saveSettings({ name, phone });
    clearCart();

    renderReceiptView(order);
}

function toggleFieldError(inputEl, hasError) {
    const wrapper = inputEl.closest(".form-field");
    wrapper.classList.toggle("invalid", hasError);
}

// ------------------------------------------------------
// STATE 3: Receipt
// ------------------------------------------------------

function renderReceiptView(order) {
    showOnly("receiptView");

    receiptViewEl.innerHTML = `
        <div class="checkout-steps">
            <span>1. Cart</span>
            <span>2. Delivery &amp; Payment</span>
            <span class="active">3. Receipt</span>
        </div>

        <div class="panel">
            <div class="success-banner">
                <i class="fa-solid fa-circle-check"></i>
                Order placed successfully! A confirmation has been saved to My Orders.
            </div>

            ${buildReceiptHTML(order)}

            <div class="receipt-actions">
                <button class="secondary-btn" id="printReceiptBtn">
                    <i class="fa-solid fa-print"></i> Print Receipt
                </button>
                <a href="orders.html" class="primary-btn">View My Orders</a>
                <a href="catalogue.html" class="secondary-btn">Continue Shopping</a>
            </div>
        </div>
    `;

    document.getElementById("printReceiptBtn").addEventListener("click", () => window.print());
}

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function showOnly(id) {
    ["cartView", "checkoutView", "receiptView"].forEach(section => {
        document.getElementById(section).style.display = section === id ? "block" : "none";
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}
