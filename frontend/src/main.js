import './input.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import app from "./pages/app.js";
import destinasi from "./pages/destinasi.js";
import culturePage from "./pages/culture.js";
import "./utils/scroll.js";

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", async () => {
  // GSAP Animation Example
  gsap.from("header", { duration: 1, y: -100, opacity: 0, ease: "bounce" });
  gsap.from("main", { duration: 1.5, opacity: 0, delay: 0.5 });
  gsap.from("footer", { duration: 1.5, y: 100, opacity: 0, delay: 1 });

  // Initialize scroll animations after content is loaded
  setTimeout(() => {
    // This gives the DOM time to fully render before initializing ScrollTrigger
    ScrollTrigger.refresh();
  }, 100);

  // Routing logic
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  const destinationId = urlParams.get("id");
  
  const main = document.querySelector("main");
  
  if (page === "culture") {
    // Load the culture page
    try {
      const cultureSectionElement = await culturePage();
      main.replaceChildren(cultureSectionElement);
    } catch (error) {
      console.error("Error loading culture page:", error);
      main.innerHTML = `<div class="py-20 text-center">
        <h2 class="text-2xl font-bold text-red-600">Error loading culture page</h2>
        <p class="mt-4">${error.message}</p>
      </div>`;
    }
  } else if (destinationId) {
    // Load destinasi page
    destinasi();
  } else {
    // Load the default app page
    app();
  }
});
