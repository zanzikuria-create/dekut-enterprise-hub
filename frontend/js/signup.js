// ======================================================
// DeKUT Nexus — Signup Page
// ======================================================

const signupBtn = document.getElementById("signupBtn");
const signupError = document.getElementById("signupError");

if (typeof isLoggedIn === "function" && isLoggedIn()) {
    window.location.href = "settings.html";
}

signupBtn.addEventListener("click", () => {
    signupError.classList.remove("show");

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const password2 = document.getElementById("signupPassword2").value;

    if (password !== password2) {
        signupError.textContent = "Passwords do not match.";
        signupError.classList.add("show");
        return;
    }

    const result = registerUser({ name, email, phone, password });

    if (!result.success) {
        signupError.textContent = result.message;
        signupError.classList.add("show");
        return;
    }

    showToast(result.message);
    signupBtn.disabled = true;

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 700);
});