// ======================================================
// DeKUT Nexus — Settings Page
// ======================================================

const nameEl = document.getElementById("settingName");
const emailEl = document.getElementById("settingEmail");
const phoneEl = document.getElementById("settingPhone");
const darkSwitch = document.getElementById("darkModeSwitch");
const notifSwitch = document.getElementById("notificationsSwitch");

function loadSettingsIntoForm() {
    const settings = getSettings();
    nameEl.value = settings.name || "";
    emailEl.value = settings.email || "";
    phoneEl.value = settings.phone || "";
    darkSwitch.checked = !!settings.darkMode;
    notifSwitch.checked = settings.notifications !== false;
}

loadSettingsIntoForm();

document.getElementById("saveProfileBtn").addEventListener("click", () => {
    saveSettings({
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        phone: phoneEl.value.trim(),
    });
    showToast("Profile saved");
});

darkSwitch.addEventListener("change", () => {
    saveSettings({ darkMode: darkSwitch.checked });
    applyDarkMode(darkSwitch.checked);
});

notifSwitch.addEventListener("change", () => {
    saveSettings({ notifications: notifSwitch.checked });
    showToast(notifSwitch.checked ? "Notifications turned on" : "Notifications turned off");
});

document.getElementById("clearCartBtn").addEventListener("click", () => {
    if (confirm("Clear all items from your cart?")) {
        clearCart();
        showToast("Cart cleared");
    }
});

document.getElementById("clearWishlistBtn").addEventListener("click", () => {
    if (confirm("Clear your wishlist?")) {
        clearWishlist();
        showToast("Wishlist cleared");
    }
});

document.getElementById("clearOrdersBtn").addEventListener("click", () => {
    if (confirm("Delete your entire order history? This can't be undone.")) {
        clearOrders();
        showToast("Order history cleared");
    }
});
