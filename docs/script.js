const DISABLE_CONTACT_SECTION = true; // Set this to `false` to enable the feature

// Modal Handling
const openModalButton = document.getElementById("open-modal");

// Check if the contact feature is disabled
if (DISABLE_CONTACT_SECTION) {
    openModalButton.addEventListener("click", () => {
        alert("Feature temporarily disabled. Please send your message via email or LinkedIn.");
    });
} else {

  // Modal Handling
  const contactModal = document.getElementById("contact-modal");
  const emailVerificationModal = document.getElementById("email-verification-modal");
  const openModalButton = document.getElementById("open-modal");
  const closeContactButton = contactModal.querySelector(".close-button");
  const closeVerificationButton = emailVerificationModal.querySelector(".close-button");

  // Open email verification modal
  openModalButton.addEventListener("click", () => {
    document.getElementById("verification-email").value = "";
    document.getElementById("verification-code").value = "";
    document.getElementById("code-input-section").style.display = "none";
    document.getElementById("email-input-section").style.display = "block";
    emailVerificationModal.style.display = "block";
  });

  // Close modals
  closeContactButton.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  // Email Verification
  closeVerificationButton.addEventListener("click", () => {
    emailVerificationModal.style.display = "none";
  });

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
        alert(result.success);
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

  // Validate Verification Code
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
        alert(result.success);
        emailVerificationModal.style.display = "none";
        const emailField = document.getElementById("email");
        emailField.value = email;
        emailField.disabled = true;
        contactModal.style.display = "block";
      } else {
        alert(result.error);
        // If too many failed attempts, close the verification modal and clear fields
        if (result.error.includes("Too many failed attempts")) {
          emailVerificationModal.style.display = "none";
          document.getElementById("verification-email").value = "";
          document.getElementById("verification-code").value = "";
        }
      }
    } catch (error) {
      console.error("Error validating verification code:", error);
      alert("Something went wrong. Please try again later.");
    }
  });


  // Contact Form Submission
  const contactForm = document.getElementById("contact-form"); 
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
      
        document.getElementById("email").disabled = false;
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
}
// Dropdown Menu
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
// Prevent default Enter key behavior
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});