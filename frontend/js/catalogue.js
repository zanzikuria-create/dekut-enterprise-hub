// ======================================
// DeKUT Nexus Product Catalogue
// ======================================

const products = [

    {
        category: "coffee",
        name: "Ground Coffee",
        price: 350,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/coffee/ground-coffee.jpg"
    },

    {
        category: "coffee",
        name: "Coffee Beans",
        price: 450,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/coffee/coffee-beans.jpg"
    },

    {
        category: "coffee",
        name: "Coffee Gift Pack",
        price: 1200,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/coffee/gift-pack.jpg"
    },

    {
        category: "coffee",
        name: "Coffee Seedlings",
        price: 250,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/coffee/seedlings.jpg"
    },

    {
        category: "honey",
        name: "Pure Honey",
        price: 250,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/honey/honey.jpg"
    },

    {
        category: "milk",
        name: "Fresh Milk",
        price: 60,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/milk/milk.jpg"
    },

    {
        category: "yoghurt",
        name: "Vanilla Yoghurt",
        price: 100,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/yoghurt/vanilla.jpg"
    },

    {
        category: "merchandise",
        name: "Coffee Mug",
        price: 500,
        rating: "⭐⭐⭐⭐⭐",
        image: "../images/merchandise/mug.jpg"
    }

];

// ======================================

const params = new URLSearchParams(window.location.search);

const search = params.get("search").toLowerCase();

document.getElementById("catalogueTitle").textContent =
    search.charAt(0).toUpperCase() +
    search.slice(1) +
    " Catalogue";

const catalogue = document.getElementById("catalogueProducts");

const related = document.getElementById("relatedProducts");

// products found

const foundProducts = products.filter(product =>
    product.category.includes(search) ||
    product.name.toLowerCase().includes(search)
);

// related products

const relatedProducts = products.filter(product =>
    product.category !== search
).slice(0, 4);

// ======================================
// Display Products
// ======================================

function createCard(product) {

    return `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <div class="rating">

                ${product.rating}

            </div>

            <div class="price">

                KSh ${product.price}

            </div>

            <a href="product.html" class="view-btn">

                View Product

            </a>

        </div>

    `;

}

// ================================
// Products Found
// ================================

if (foundProducts.length > 0) {

    foundProducts.forEach(product => {

        catalogue.innerHTML += createCard(product);

    });

} else {

    catalogue.innerHTML = `

        <div class="no-products">

            <img src="../images/elephant-search.png"
                 alt="Not Found"
                 style="width:220px;">

            <h2>

                Product Not Found

            </h2>

            <p>

                Your search "${search}"
                found no matching products.

            </p>

        </div>

    `;

}

// ================================
// Related Products
// ================================

relatedProducts.forEach(product => {

    related.innerHTML += createCard(product);

});