// ======================================================
// DeKUT Nexus — Product Catalogue Page
// Reads ?search= and/or ?category= from the URL and
// renders matching products from the shared PRODUCTS list.
// ======================================================

const ASSET_BASE = "../";

const params = new URLSearchParams(window.location.search);
const searchTerm = (params.get("search") || "").trim().toLowerCase();
const categoryParam = (params.get("category") || "").trim().toLowerCase();

const catalogueTitleEl = document.getElementById("catalogueTitle");
const catalogueEl = document.getElementById("catalogueProducts");
const relatedEl = document.getElementById("relatedProducts");

// ------------------------------------------------------
// Work out a friendly page title
// ------------------------------------------------------

function buildTitle() {
    if (categoryParam && CATEGORY_LABELS[categoryParam]) {
        return CATEGORY_LABELS[categoryParam];
    }
    if (searchTerm) {
        return `Results for "${searchTerm}"`;
    }
    return "All Products";
}

catalogueTitleEl.textContent = buildTitle();

// ------------------------------------------------------
// Filter products
// ------------------------------------------------------

function matchesSearch(product) {
    if (!searchTerm) return true;
    return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.section.toLowerCase().includes(searchTerm)
    );
}

function matchesCategory(product) {
    if (!categoryParam) return true;
    return product.category.toLowerCase() === categoryParam;
}

const foundProducts = PRODUCTS.filter(
    product => matchesSearch(product) && matchesCategory(product)
);

// Related products: same category as the first result, excluding results already shown
const primaryCategory = foundProducts[0] ? foundProducts[0].category : null;

const relatedProducts = PRODUCTS.filter(product => {
    if (foundProducts.includes(product)) return false;
    if (primaryCategory) return product.category === primaryCategory;
    return true;
}).slice(0, 4);

// ------------------------------------------------------
// Card rendering
// ------------------------------------------------------

function priceLabel(product) {
    if (product.price === null) return product.priceDisplay;
    return product.priceDisplay;
}

function createCard(product) {
    const ratingMarkup = product.rating
        ? `<div class="rating">${renderStars(product.rating)} <span>(${product.rating.toFixed(1)})</span></div>`
        : "";

    return `
        <div class="product-card">
            <img src="${ASSET_BASE}${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            ${ratingMarkup}
            <div class="price">${priceLabel(product)}</div>
            <a href="product.html?id=${product.id}" class="view-btn">
                ${product.ctaText || "View Product"}
            </a>
        </div>
    `;
}

// ------------------------------------------------------
// Render: products found
// ------------------------------------------------------

if (foundProducts.length > 0) {
    catalogueEl.innerHTML = foundProducts.map(createCard).join("");
} else {
    catalogueEl.innerHTML = `
        <div class="no-products">
            <img src="${ASSET_BASE}images/placeholder.svg" alt="Not Found" style="width:220px;">
            <h2>Product Not Found</h2>
            <p>Your search "${searchTerm || categoryParam}" found no matching products.</p>
        </div>
    `;
}

// ------------------------------------------------------
// Render: related products
// ------------------------------------------------------

if (relatedProducts.length > 0) {
    relatedEl.innerHTML = relatedProducts.map(createCard).join("");
} else {
    relatedEl.closest("section").style.display = "none";
}
