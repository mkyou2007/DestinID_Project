import './input.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import app from "./pages/app.js";
import destinasi from "./pages/destinasi.js";
import "./utils/scroll.js";

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  // GSAP Animation Example
  gsap.from("header", { duration: 1, y: -100, opacity: 0, ease: "bounce" });
  gsap.from("main", { duration: 1.5, opacity: 0, delay: 0.5 });
  gsap.from("footer", { duration: 1.5, y: 100, opacity: 0, delay: 1 });

  // Initialize scroll animations after content is loaded
  setTimeout(() => {
    // This gives the DOM time to fully render before initializing ScrollTrigger
    ScrollTrigger.refresh();
  }, 100);

  // Existing logic
  const urlParams = new URLSearchParams(window.location.search);
  const destinationId = urlParams.get("id");
  if (destinationId) {
    destinasi();
  } else {
    app();
  }
});
