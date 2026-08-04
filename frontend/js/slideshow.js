// ==========================================
// DeKUT Nexus Hero Slideshow
// ==========================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");

let currentSlide = 0;
let slideInterval;

// ----------------------------
// Display Current Slide
// ----------------------------

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));

    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");

    dots[index].classList.add("active");

}

// ----------------------------
// Next
// ----------------------------

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

// ----------------------------
// Previous
// ----------------------------

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}

// ----------------------------
// Buttons
// ----------------------------

nextBtn.addEventListener("click", () => {

    nextSlide();

});

prevBtn.addEventListener("click", () => {

    previousSlide();

});

// ----------------------------
// Dots
// ----------------------------

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showSlide(currentSlide);

    });

});

// ----------------------------
// Automatic Sliding
// ----------------------------

function startSlider() {

    slideInterval = setInterval(nextSlide, 5000);

}

function stopSlider() {

    clearInterval(slideInterval);

}

const hero = document.querySelector(".hero-slider");

hero.addEventListener("mouseenter", stopSlider);

hero.addEventListener("mouseleave", startSlider);

// ----------------------------

showSlide(currentSlide);

startSlider();