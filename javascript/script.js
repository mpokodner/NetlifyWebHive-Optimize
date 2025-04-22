// Wait for the DOM to fully load before executing
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll effect for header
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "#E0D7C7";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.backgroundColor = "#f2f2f2";
      header.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    }
  });

  // Add animation for services on scroll
  const services = document.querySelectorAll(".service");

  // Simple animation on scroll
  function checkScroll() {
    services.forEach((service) => {
      const servicePosition = service.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (servicePosition < screenPosition) {
        service.style.opacity = "1";
        service.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for services
  services.forEach((service) => {
    service.style.opacity = "0";
    service.style.transform = "translateY(20px)";
    service.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Check on load and scroll
  window.addEventListener("load", checkScroll);
  window.addEventListener("scroll", checkScroll);

  // Form validation (for future contact form)
  const contactForm = document.querySelector("form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const requiredFields = contactForm.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach((field) => {
        if (!field.value) {
          valid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  }
});
