// js/script.js

// Lazy Loading
document.addEventListener("DOMContentLoaded", function () {
  let lazyImages = [].slice.call(
    document.querySelectorAll("img[loading=lazy]")
  );

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src; // Swap data-src with src
          lazyImage.removeAttribute("data-src"); // Remove data-src attribute
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    // Load all images immediately (less efficient)
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.removeAttribute("data-src");
    });
  }
});

// Mobile Navigation (Hamburger Menu)
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll("nav ul li a").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
});
