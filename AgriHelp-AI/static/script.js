const revealElements = document.querySelectorAll(
    ".glass-card, .panel, .assistant-panel, .hero-text, .hero-visual"
);

revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition = "0.8s ease";
});

function revealOnScroll() {
    revealElements.forEach((element) => {
        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 80) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Quick buttons
const quickButtons = document.querySelectorAll(".quick-btn");
const queryBox = document.getElementById("queryBox");

quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
        queryBox.value = button.dataset.query;
        queryBox.focus();
        document.getElementById("assistant").scrollIntoView({ behavior: "smooth" });
    });
});

// Typing animation
const responseText = document.getElementById("aiResponse");

if (responseText) {
    const text = responseText.innerText;
    responseText.innerText = "";

    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            responseText.innerText += text.charAt(index);
            index++;
            setTimeout(typeEffect, 18);
        }
    }

    typeEffect();
}

// Student-level AI scan simulation
const uploadInput = document.getElementById("cropImage");
const statusText = document.getElementById("scanStatus");
const scanMessage = document.getElementById("scanMessage");
const scanProgress = document.getElementById("scanProgress");
const previewImage = document.getElementById("previewImage");

if (uploadInput) {
    uploadInput.addEventListener("change", () => {
        const file = uploadInput.files[0];

        if (file) {
            previewImage.src = URL.createObjectURL(file);
            previewImage.style.display = "block";
        }

        statusText.innerText = "Scanning...";
        statusText.style.color = "#00d4ff";
        scanMessage.innerText = "AgriSight AI is analyzing crop leaf patterns...";
        scanProgress.style.width = "45%";

        setTimeout(() => {
            statusText.innerText = "Healthy";
            statusText.style.color = "#6dff9d";
            scanMessage.innerText = "No major disease detected. Crop health looks stable. Continue regular monitoring.";
            scanProgress.style.width = "92%";
        }, 1800);
    });
}