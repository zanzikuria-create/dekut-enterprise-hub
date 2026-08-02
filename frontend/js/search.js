// ======================================
// DeKUT Nexus Search
// ======================================

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

function searchProduct() {

    const search = searchInput.value.trim();

    if (search === "") {

        alert("Please enter a product to search.");

        return;

    }

    window.location.href =
        "pages/catalogue.html?search=" +
        encodeURIComponent(search);

}

searchBtn.addEventListener("click", searchProduct);

searchInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchProduct();

    }

});