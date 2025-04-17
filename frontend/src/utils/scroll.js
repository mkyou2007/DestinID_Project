// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("a[href^='#']");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});