//navbar
// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle functionality
  const navButton = document.querySelector(".navbar-toggler");
  const navbarNav = document.querySelector("#navbarNav");

  if (navButton && navbarNav) {
    // Ensure button styling is consistent
    navButton.style.borderColor = "var(--gold)";

    // Handle mobile menu toggle
    navButton.addEventListener("click", function () {
      // Bootstrap handles the collapse, but we can add custom behavior here if needed
      const isExpanded = navButton.getAttribute("aria-expanded") === "true";

      // Update aria-expanded for accessibility
      setTimeout(() => {
        navButton.setAttribute("aria-expanded", !isExpanded);
      }, 50);
    });
  }

  // Highlight current nav link based on URL
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  // Remove any existing active classes first
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to current page link
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, "") || "/";

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // Optional: Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      // Check if we're in mobile view
      if (window.innerWidth < 992) {
        const navbarCollapse = document.querySelector("#navbarNav");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          // Use Bootstrap's collapse method if available
          if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
            const collapse = new bootstrap.Collapse(navbarCollapse);
            collapse.hide();
          } else {
            // Fallback: manually remove the show class
            navbarCollapse.classList.remove("show");
            navButton.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // Handle window resize to ensure proper mobile menu behavior
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      // Desktop view - ensure mobile menu is hidden
      const navbarCollapse = document.querySelector("#navbarNav");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
        navButton.setAttribute("aria-expanded", "false");
      }
    }
  });
});

//added for hive page and may need to fix
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
