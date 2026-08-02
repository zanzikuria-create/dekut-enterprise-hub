// ==============================
// SIDE MENU
// ==============================

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");

// Open Menu
openMenu.addEventListener("click", () => {
    menuOverlay.classList.add("active");
});

// Close using X
closeMenu.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
});

// Close by clicking outside
menuOverlay.addEventListener("click", (e) => {

    if (e.target === menuOverlay) {
        menuOverlay.classList.remove("active");
    }

});