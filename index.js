document.addEventListener("DOMContentLoaded", function () {
  const navButton = document.querySelector(".navbar-toggler");
  const navbarNav = document.querySelector("#navbarNav");

  if (navButton && navbarNav) {
    navButton.style.color = "black";

    navButton.addEventListener("click", function () {
      navbarNav.classList.toggle("open");
    });
  }
});
