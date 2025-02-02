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

// JavaScript to handle form submission
const form = document.getElementById("contact-form"); // Assuming your form has this ID
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    const response = await fetch("/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.success);
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Error during form submission:", error);
    alert("Something went wrong. Please try again later.");
  }
});


// Toggle dropdown functionality
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownContent = document.querySelector('.dropdown-content');

// Event listener for toggle button
dropdownToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent event from bubbling up
  dropdownContent.classList.toggle('visible');
});

// Close dropdown when clicking anywhere else
document.addEventListener('click', (e) => {
  if (!dropdownContent.contains(e.target)) {
    dropdownContent.classList.remove('visible'); // Close dropdown
  }
});


