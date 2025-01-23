// JavaScript to handle modal behavior
const modal = document.getElementById("contact-modal");
const openModalButton = document.getElementById("open-modal");
const closeButton = document.querySelector(".close-button");

// Open modal
openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal if clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});