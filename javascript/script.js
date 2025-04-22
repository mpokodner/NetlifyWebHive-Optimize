// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navbar functionality - sticky header on scroll
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return; // Skip if it's just a placeholder link

      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Project filtering functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.textContent.toLowerCase();

      // Filter projects based on category
      projectItems.forEach((item) => {
        // For demonstration purposes, we'll add data attributes to items in the HTML
        // For now, we'll just implement the "All" filter and assume categories
        if (filterValue === "all") {
          item.style.display = "block";
        } else {
          // This assumes you'll add a data-category attribute to each project-item
          const category = item.getAttribute("data-category") || "";

          if (category.toLowerCase().includes(filterValue)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });

  // Skill progress animation (would require adding progress bars to HTML)
  const animateSkills = () => {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-progress") + "%";
      bar.style.width = targetWidth;
    });
  };

  // CV Download button functionality
  const downloadBtn = document.querySelector(".btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      // This would typically link to an actual file
      // For now, we'll just show an alert
      if (!this.href || this.href === "#") {
        e.preventDefault();
        alert("CV download functionality will be implemented here.");
      }
    });
  }

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("animate");
      }
    });
  };

  // Call once on load and then on scroll
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Project hover effects
  const projectImages = document.querySelectorAll(".project-image");

  projectImages.forEach((image) => {
    image.addEventListener("mouseenter", function () {
      this.classList.add("hover");
    });

    image.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });
  });

  // Form validation (if you add a contact form later)
  const setupFormValidation = () => {
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Basic validation
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const messageInput = this.querySelector('textarea[name="message"]');

        let isValid = true;

        if (!nameInput.value.trim()) {
          markInvalid(nameInput, "Name is required");
          isValid = false;
        }

        if (!emailInput.value.trim()) {
          markInvalid(emailInput, "Email is required");
          isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
          markInvalid(emailInput, "Please enter a valid email");
          isValid = false;
        }

        if (!messageInput.value.trim()) {
          markInvalid(messageInput, "Message is required");
          isValid = false;
        }

        if (isValid) {
          // Submit form or show success message
          alert("Form submitted successfully!");
          this.reset();
        }
      });
    }
  };

  const markInvalid = (input, message) => {
    input.classList.add("invalid");
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.textContent = message;

    // Remove any existing error messages
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    input.parentElement.appendChild(errorMsg);

    // Remove error on input
    input.addEventListener(
      "input",
      function () {
        this.classList.remove("invalid");
        const error = this.parentElement.querySelector(".error-message");
        if (error) {
          error.remove();
        }
      },
      { once: true }
    );
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Initialize form validation
  setupFormValidation();

  // Mobile menu toggle (if you add a mobile menu later)
  const setupMobileMenu = () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        mobileMenu.classList.toggle("active");
      });
    }
  };

  // Initialize mobile menu
  setupMobileMenu();
});
