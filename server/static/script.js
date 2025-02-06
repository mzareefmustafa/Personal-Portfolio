// ------------------------------
// Modal and UI Behavior
// ------------------------------

// Get modals
const contactModal = document.getElementById("contact-modal");
const emailVerificationModal = document.getElementById("email-verification-modal");

// Get buttons
const openModalButton = document.getElementById("open-modal");

// Scope the close buttons to their respective modals
const closeContactButton = contactModal.querySelector(".close-button");
const closeVerificationButton = emailVerificationModal.querySelector(".close-button");

// Open email verification modal on "Click Here to Leave a Message"
openModalButton.addEventListener("click", () => {
  // Open the email verification modal and reset its fields
  document.getElementById("verification-email").value = "";
  document.getElementById("verification-code").value = "";
  document.getElementById("code-input-section").style.display = "none";
  document.getElementById("email-input-section").style.display = "block";
  emailVerificationModal.style.display = "block";
});

// Close contact modal when its close button is clicked
closeContactButton.addEventListener("click", () => {
  contactModal.style.display = "none";
});

// Close verification modal when its close button is clicked
closeVerificationButton.addEventListener("click", () => {
  emailVerificationModal.style.display = "none";
});

// (Removed the event listener for closing the modals by clicking outside)

// ------------------------------
// Email Verification Process
// ------------------------------

// Handle "Verify Email" button click
const sendVerificationBtn = document.getElementById("send-verification-btn");
sendVerificationBtn.addEventListener("click", async () => {
  const email = document.getElementById("verification-email").value.trim();
  if (!email) {
    alert("Please enter an email address.");
    return;
  }

  try {
    const response = await fetch("/send-verification-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.success); // e.g., "A verification code has been sent..."
      // Show the verification code input section and hide the email input section
      document.getElementById("email-input-section").style.display = "none";
      document.getElementById("code-input-section").style.display = "block";
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Error sending verification code:", error);
    alert("Something went wrong. Please try again later.");
  }
});

// Handle "Validate" button click
const validateCodeBtn = document.getElementById("validate-code-btn");
validateCodeBtn.addEventListener("click", async () => {
  const email = document.getElementById("verification-email").value.trim();
  const code = document.getElementById("verification-code").value.trim();
  if (!code) {
    alert("Please enter the verification code.");
    return;
  }

  try {
    const response = await fetch("/validate-verification-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, code: code }),
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.success); // e.g., "Email verified successfully!"
      emailVerificationModal.style.display = "none";
      // Pre-fill the email field in the contact form and disable editing
      const emailField = document.getElementById("email");
      emailField.value = email;
      emailField.disabled = true;
      // Open the contact modal
      contactModal.style.display = "block";
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Error validating verification code:", error);
    alert("Something went wrong. Please try again later.");
  }
});

// ------------------------------
// Existing Contact Form Submission
// ------------------------------

const contactForm = document.getElementById("contact-form"); // Assuming your form has this ID
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    // Email is pre-filled and disabled if verified
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
      contactModal.style.display = "none";
      // Optionally, re-enable the email field for next time
      document.getElementById("email").disabled = false;
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Error during form submission:", error);
    alert("Something went wrong. Please try again later.");
  }
});

// ------------------------------
// Dropdown Functionality (unchanged)
// ------------------------------

const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownContent.classList.toggle('visible');
});

document.addEventListener('click', (e) => {
  if (!dropdownContent.contains(e.target)) {
    dropdownContent.classList.remove('visible');
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
