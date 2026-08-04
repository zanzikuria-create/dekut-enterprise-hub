// ======================================================
// DeKUT Nexus — Contact Us Page
// No backend yet, so submitting simulates a send and
// stores nothing but a friendly confirmation on screen.
// ======================================================

const nameEl = document.getElementById("contactName");
const emailEl = document.getElementById("contactEmail");
const subjectEl = document.getElementById("contactSubject");
const messageEl = document.getElementById("contactMessage");
const bannerEl = document.getElementById("successBanner");

document.getElementById("sendMessageBtn").addEventListener("click", () => {
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const subject = subjectEl.value.trim();
    const message = messageEl.value.trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    toggleFieldError(nameEl, name.length === 0);
    toggleFieldError(emailEl, !emailOk);
    toggleFieldError(subjectEl, subject.length === 0);
    toggleFieldError(messageEl, message.length === 0);

    const anyInvalid = [nameEl, emailEl, subjectEl, messageEl]
        .some(el => el.closest(".form-field").classList.contains("invalid"));

    if (anyInvalid) {
        showToast("Please fix the highlighted fields");
        return;
    }

    bannerEl.innerHTML = `
        <div class="success-banner">
            <i class="fa-solid fa-circle-check"></i>
            Thanks, ${name}! Your message has been sent — we'll get back to you at ${email}.
        </div>
    `;

    nameEl.value = "";
    emailEl.value = "";
    subjectEl.value = "";
    messageEl.value = "";

    bannerEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

function toggleFieldError(inputEl, hasError) {
    inputEl.closest(".form-field").classList.toggle("invalid", hasError);
}
