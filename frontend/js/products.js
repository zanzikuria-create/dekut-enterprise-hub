// ======================================================
<<<<<<< HEAD
// DeKUT Nexus Product Database
// ======================================================

const products = [

    /* ======================================================
       AGRICULTURAL PRODUCTS
    ====================================================== */

    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "Agricultural Products",
        keywords: ["tomato", "tomatoes", "vegetables", "farm"],
        price: "KSh 30 / Kg",
        rating: "★★★★★ (5.0)",
        image: "images/products/tomatoes.png",
        page: "product.html?id=1"
    },

    {
        id: 2,
        name: "Green Cabbages",
        category: "Agricultural Products",
        keywords: ["cabbage", "cabbages", "vegetables"],
        price: "KSh 30 Each",
        rating: "★★★★★ (4.9)",
        image: "images/products/cabbages.png",
        page: "product.html?id=2"
    },

    {
        id: 3,
        name: "Fresh Spinach",
        category: "Agricultural Products",
        keywords: ["spinach", "vegetables"],
        price: "KSh 25 Per Bunch",
        rating: "★★★★★ (4.9)",
        image: "images/products/spinach.png",
        page: "product.html?id=3"
    },

    {
        id: 4,
        name: "Kales (Sukuma Wiki)",
        category: "Agricultural Products",
        keywords: ["kales", "sukuma", "vegetables"],
        price: "KSh 20 Per Bunch",
        rating: "★★★★★ (4.8)",
        image: "images/products/kales.png",
        page: "product.html?id=4"
    },

    {
        id: 5,
        name: "Fresh Onions",
        category: "Agricultural Products",
        keywords: ["onions", "vegetables"],
        price: "KSh 40 / Kg",
        rating: "★★★★★ (4.7)",
        image: "images/products/onions.png",
        page: "product.html?id=5"
    },

    {
        id: 6,
        name: "Fresh Avocados",
        category: "Agricultural Products",
        keywords: ["avocado", "avocados", "fruit"],
        price: "KSh 20 Each",
        rating: "★★★★★ (4.8)",
        image: "images/products/avocados.png",
        page: "product.html?id=6"
    },

    {
        id: 7,
        name: "Sweet Bananas",
        category: "Agricultural Products",
        keywords: ["banana", "bananas", "fruit"],
        price: "KSh 15 Each",
        rating: "★★★★★ (4.9)",
        image: "images/products/bananas.png",
        page: "product.html?id=7"
    },

    /* ======================================================
       COFFEE PRODUCTS
    ====================================================== */

    {
        id: 8,
        name: "Ground Coffee",
        category: "Coffee Products",
        keywords: ["coffee", "ground coffee", "Dekut Coffee"],
        price: "KSh 450",
        rating: "★★★★★ (5.0)",
        image: "images/products/Dekut Coffee.png",
        page: "product.html?id=8"
    },

    {
        id: 9,
        name: "Coffee Beans",
        category: "Coffee Products",
        keywords: ["coffee", "beans", "coffee beans"],
        price: "KSh 500",
        rating: "★★★★★ (4.9)",
        image: "images/products/coffee beans.png",
        page: "product.html?id=9"
    },

    {
        id: 10,
        name: "Arabica Coffee",
        category: "Coffee Products",
        keywords: ["arabica", "coffee"],
        price: "KSh 450",
        rating: "★★★★★ (4.8)",
        image: "images/products/Arabica.png",
        page: "product.html?id=10"
    },

    {
        id: 11,
        name: "Expresso Coffee",
        category: "Coffee Products",
        keywords: ["expresso", "coffee"],
        price: "KSh 520",
        rating: "★★★★★ (5.0)",
        image: "images/products/Expresso Coffee.png",
        page: "product.html?id=11"
    },

    /* ======================================================
       DAIRY PRODUCTS
    ====================================================== */

    {
        id: 12,
        name: "Fresh Milk",
        category: "Dairy Products",
        keywords: ["milk", "fresh milk", "dairy"],
        price: "KSh 70 / Litre",
        rating: "★★★★★ (5.0)",
        image: "images/products/fresh milk.png",
        page: "product.html?id=12"
    },

    {
        id: 13,
        name: "Strawberry Yoghurt",
        category: "Dairy Products",
        keywords: ["yoghurt", "strawberry", "dairy"],
        price: "KSh 100",
        rating: "★★★★★ (5.0)",
        image: "images/products/strawberry yoghurt.png",
        page: "product.html?id=13"
    },
    {
        id: 14,
        name: "Vanilla Chia Yoghurt",
        category: "Dairy Products",
        keywords: ["yoghurt", "vanilla", "chia", "dairy"],
        price: "KSh 120",
        rating: "★★★★★ (4.8)",
        image: "images/products/vanilla chia.png",
        page: "product.html?id=14"
    },
    /* ======================================================
   TREE SEEDLINGS
====================================================== */

    {
        id: 15,
        name: "Macadamia Seedlings",
        category: "Tree Seedlings",
        keywords: ["macadamia", "seedlings", "tree"],
        price: "KSh 250",
        rating: "★★★★★ (5.0)",
        image: "images/products/macadamia seedlings.png",
        page: "product.html?id=15"
    },

    {
        id: 16,
        name: "Coffee Seedlings",
        category: "Tree Seedlings",
        keywords: ["coffee seedlings", "coffee", "seedlings"],
        price: "KSh 120",
        rating: "★★★★★ (4.8)",
        image: "images/products/coffee seedlings.png",
        page: "product.html?id=16"
    },

    {
        id: 17,
        name: "Avocado Seedlings",
        category: "Tree Seedlings",
        keywords: ["avocado", "seedlings"],
        price: "KSh 150",
        rating: "★★★★★ (4.9)",
        image: "images/products/avocado seedlings.png",
        page: "product.html?id=17"
    },

    /* ======================================================
       MERCHANDISE
    ====================================================== */

    {
        id: 18,
        name: "DeKUT Shirts",
        category: "Merchandise",
        keywords: ["shirt", "tshirt", "polo", "merchandise"],
        price: "KSh 700",
        rating: "★★★★★ (4.8)",
        image: "images/products/shirts.png",
        page: "product.html?id=18"
    },

    {
        id: 19,
        name: "Branded Coffee Mug",
        category: "Merchandise",
        keywords: ["mug", "coffee mug", "branded"],
        price: "KSh 450",
        rating: "★★★★★ (4.9)",
        image: "images/products/branded coffee mug.png",
        page: "product.html?id=19"
    },

    {
        id: 20,
        name: "Hand Wash",
        category: "Merchandise",
        keywords: ["handwash", "soap", "detergent"],
        price: "KSh 200",
        rating: "★★★★★ (4.8)",
        image: "images/products/handwash.png",
        page: "product.html?id=20"
    },

    {
        id: 21,
        name: "Eco-Friendly Detergent",
        category: "Merchandise",
        keywords: ["detergent", "cleaning"],
        price: "KSh 350",
        rating: "★★★★★ (4.8)",
        image: "images/products/detergents.png",
        page: "product.html?id=21"
    },

    /* ======================================================
       FARM PRODUCTS
    ====================================================== */

    {
        id: 22,
        name: "Rabbit Meat",
        category: "Farm Products",
        keywords: ["rabbit", "rabbit meat", "meat"],
        price: "KSh 800 / Kg",
        rating: "★★★★★ (4.8)",
        image: "images/products/rabbitmeat.png",
        page: "product.html?id=22"
    },

    /* ======================================================
       BUNDLE OFFERS
    ====================================================== */

    {
        id: 23,
        name: "Back To School Bundle",
        category: "Bundle Offers",
        keywords: ["bundle", "school", "back to school"],
        price: "KSh 350",
        rating: "★★★★★ (5.0)",
        image: "images/products/back2skool.png",
        page: "product.html?id=23"
    },

    {
        id: 24,
        name: "Healthy Family Basket",
        category: "Bundle Offers",
        keywords: ["healthy", "family", "basket", "bundle"],
        price: "KSh 1150",
        rating: "★★★★★ (5.0)",
        image: "images/products/healthy family.png",
        page: "product.html?id=24"
    },

    {
        id: 25,
        name: "Mega Pack",
        category: "Bundle Offers",
        keywords: ["mega", "pack", "bundle"],
        price: "KSh 999",
        rating: "★★★★★ (5.0)",
        image: "images/products/mega pack.png",
        page: "product.html?id=25"
    },

    /* ======================================================
       WILDLIFE
    ====================================================== */

    {
        id: 26,
        name: "Wildlife Tour",
        category: "Wildlife",
        keywords: ["wildlife", "tour", "zebra", "nature"],
        price: "KSh 200 Per Person",
        rating: "★★★★★ (4.9)",
        image: "images/products/zebras.png",
        page: "product.html?id=26"
    },

    /* ======================================================
       CONFERENCE & ACCOMMODATION
    ====================================================== */

    {
        id: 27,
        name: "Satima Dome",
        category: "Conference & Accommodation",
        keywords: ["satima", "dome", "conference"],
        price: "Contact For Pricing",
        rating: "★★★★★ (5.0)",
        image: "images/services/satima.png",
        page: "product.html?id=27"
    },

    {
        id: 28,
        name: "Guest Rooms",
        category: "Conference & Accommodation",
        keywords: ["guest", "rooms", "accommodation", "hotel"],
        price: "From KSh 4,500 / Night",
        rating: "★★★★★ (4.9)",
        image: "images/services/rooms.png",
        page: "product.html?id=28"
    },

    {
        id: 29,
        name: "Seminar Room",
        category: "Conference & Accommodation",
        keywords: ["seminar", "room"],
        price: "From KSh 8,000",
        rating: "★★★★★ (4.9)",
        image: "images/services/seminar.png",
        page: "product.html?id=29"
    },

    {
        id: 30,
        name: "Conference Catering",
        category: "Conference & Accommodation",
        keywords: ["catering", "food", "conference"],
        price: "Custom Packages",
        rating: "★★★★★ (5.0)",
        image: "images/services/restaurant.png",
        page: "product.html?id=30"
    }

];
=======
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
>>>>>>> 5878fe431efd71e21a5ab1c57df5b26dd392a3b2
