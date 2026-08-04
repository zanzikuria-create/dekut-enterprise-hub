// ======================================================
// DeKUT Nexus — Product Detail Page
// Reads ?id= from the URL, looks it up in the shared
// PRODUCTS list, and renders the full product view.
// ======================================================

const ASSET_BASE = "../";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const detailEl = document.getElementById("productDetail");
const relatedEl = document.getElementById("relatedProducts");
const breadcrumbEl = document.getElementById("breadcrumbCategory");

const product = productId ? getProductById(productId) : null;

if (!product) {
    renderNotFound();
} else {
    renderProduct(product);
    renderRelated(product);
}

// ------------------------------------------------------
// Not found state
// ------------------------------------------------------

function renderNotFound() {
    document.title = "Product Not Found | DeKUT Nexus";

    detailEl.innerHTML = `
        <div class="no-products">
            <img src="${ASSET_BASE}images/placeholder.svg" alt="Not Found" style="width:220px;">
            <h2>Product Not Found</h2>
            <p>We couldn't find the product you're looking for.</p>
            <a href="catalogue.html" class="view-btn">Browse Catalogue</a>
        </div>
    `;

    document.querySelector(".related-products").style.display = "none";
}

// ------------------------------------------------------
// Main product render
// ------------------------------------------------------

function renderProduct(product) {
    document.title = `${product.name} | DeKUT Nexus`;

    breadcrumbEl.innerHTML = `
        <i class="fa-solid fa-chevron-right"></i>
        <a href="catalogue.html?category=${encodeURIComponent(product.category)}">${product.section}</a>
    `;

    const ratingMarkup = product.rating
        ? `<div class="rating">${renderStars(product.rating)} <span>(${product.rating.toFixed(1)} / 5)</span></div>`
        : `<div class="rating"><span>Not yet rated</span></div>`;

    const availabilityMarkup = product.available
        ? `<span class="stock in-stock"><i class="fa-solid fa-circle-check"></i> In Stock</span>`
        : `<span class="stock out-of-stock"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`;

    detailEl.innerHTML = `
        <div class="product-image-wrap">
            <img src="${ASSET_BASE}${product.image}" alt="${product.name}" id="productImage">
        </div>

        <div class="product-info">
            <p class="product-location"><i class="fa-solid fa-location-dot"></i> ${product.location}</p>

            <h1 class="product-title">${product.name}</h1>

            ${ratingMarkup}

            <div class="product-price">${product.priceDisplay}</div>

            ${availabilityMarkup}

            <p class="product-description">${product.description}</p>

            <div class="quantity-selector">
                <label for="qtyInput">Quantity</label>
                <div class="qty-controls">
                    <button type="button" id="qtyMinus" aria-label="Decrease quantity">−</button>
                    <input type="number" id="qtyInput" value="1" min="1" max="99">
                    <button type="button" id="qtyPlus" aria-label="Increase quantity">+</button>
                </div>
            </div>

            <div class="product-actions">
                <button type="button" id="addToCartBtn" class="add-to-cart-btn" ${product.available ? "" : "disabled"}>
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>
                <button type="button" id="buyNowBtn" class="buy-now-btn" ${product.available ? "" : "disabled"}>
                    Buy Now
                </button>
            </div>
        </div>
    `;

    wireUpQuantity();
    wireUpActions(product);
}

// ------------------------------------------------------
// Quantity stepper
// ------------------------------------------------------

function wireUpQuantity() {
    const qtyInput = document.getElementById("qtyInput");
    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus = document.getElementById("qtyPlus");

    qtyMinus.addEventListener("click", () => {
        const value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        qtyInput.value = value;
    });

    qtyPlus.addEventListener("click", () => {
        const value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
        qtyInput.value = value;
    });

    qtyInput.addEventListener("change", () => {
        let value = parseInt(qtyInput.value, 10);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 99) value = 99;
        qtyInput.value = value;
    });
}

// ------------------------------------------------------
// Add to cart / buy now
// ------------------------------------------------------

function wireUpActions(product) {
    const addBtn = document.getElementById("addToCartBtn");
    const buyBtn = document.getElementById("buyNowBtn");
    const qtyInput = document.getElementById("qtyInput");

    addBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        addToCart(product.id, qty);
        showToast(`Added ${qty} × ${product.name} to your cart`);
    });

    buyBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        addToCart(product.id, qty);
        window.location.href = "cart.html";
    });
}

// ------------------------------------------------------
// Related products (same category, excluding this one)
// ------------------------------------------------------

function renderRelated(product) {
    const related = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    if (related.length === 0) {
        document.querySelector(".related-products").style.display = "none";
        return;
    }

    relatedEl.innerHTML = related.map(p => `
        <div class="product-card">
            <img src="${ASSET_BASE}${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            ${p.rating ? `<div class="rating">${renderStars(p.rating)} <span>(${p.rating.toFixed(1)})</span></div>` : ""}
            <div class="price">${p.priceDisplay}</div>
            <a href="product.html?id=${p.id}" class="view-btn">${p.ctaText || "View Product"}</a>
        </div>
    `).join("");
}
