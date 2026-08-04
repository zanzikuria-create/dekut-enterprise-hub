// ======================================================
// DeKUT Nexus — Wishlist Page
// ======================================================

const ASSET_BASE = "../";

const gridEl = document.getElementById("wishlistGrid");

renderWishlist();

function renderWishlist() {
    const items = getWishlistDetails();

    if (items.length === 0) {
        gridEl.innerHTML = `
            <div class="panel empty-state" style="grid-column:1/-1;">
                <i class="fa-regular fa-heart"></i>
                <h2>Your wishlist is empty</h2>
                <p>Tap the heart on any product to save it here.</p>
                <a href="catalogue.html" class="primary-btn">Browse Products</a>
            </div>
        `;
        return;
    }

    gridEl.innerHTML = items.map(cardHTML).join("");

    // Decorate first (adds the heart button, already active), then wire quick actions
    decorateProductCards(gridEl);

    gridEl.querySelectorAll(".wishlist-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            // give the toast/animation a moment, then re-render so removed items disappear
            setTimeout(renderWishlist, 250);
        });
    });

    gridEl.querySelectorAll(".quick-add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            addToCart(btn.dataset.id, 1);
            const product = getProductById(btn.dataset.id);
            showToast(`${product.name} added to cart`);
        });
    });
}

function cardHTML(product) {
    return `
        <div class="product-card">
            <img src="${ASSET_BASE}${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            ${product.rating ? `<div class="rating">${renderStars(product.rating)} <span>(${product.rating.toFixed(1)})</span></div>` : ""}
            <div class="price">${product.priceDisplay}</div>
            <div style="display:flex; gap:10px; justify-content:center; padding: 0 16px;">
                <a href="product.html?id=${product.id}" class="view-btn">View</a>
                <button type="button" class="view-btn quick-add-btn" data-id="${product.id}" style="background:#D4AF37;">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}
