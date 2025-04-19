import './input.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import app from "./pages/app.js";
import destinasi from "./pages/destinasi.js";
import culturePage from "./pages/culture.js";
import "./utils/scroll.js";

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

// Force-fix mobile menu functionality (for all pages)
function forceFixMobileMenu() {
  // Get references to the mobile menu elements
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenuContent = document.getElementById("mobile-menu-content");
  const menuIcon = document.getElementById("menu-icon");
  
  // Only proceed if all elements exist
  if (!mobileMenuButton || !mobileMenuContent || !menuIcon) {
    console.error("Mobile menu elements not found!");
    return;
  }
  
  // First, ensure mobile menu content has the hidden class initially
  if (!mobileMenuContent.classList.contains("hidden")) {
    mobileMenuContent.classList.add("hidden");
  }
  
  // Remove all existing event listeners by cloning
  const newMenuButton = mobileMenuButton.cloneNode(true);
  mobileMenuButton.parentNode.replaceChild(newMenuButton, mobileMenuButton);
  
  // Get new reference to icon
  const newMenuIcon = document.getElementById("menu-icon");
  
  // Set new click handler on the mobile menu button
  newMenuButton.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle visibility
    mobileMenuContent.classList.toggle("hidden");
    
    // Toggle icon
    if (mobileMenuContent.classList.contains("hidden")) {
      newMenuIcon.classList.remove("ph-x");
      newMenuIcon.classList.add("ph-list");
    } else {
      newMenuIcon.classList.remove("ph-list");
      newMenuIcon.classList.add("ph-x");
    }
    
    return false;
  });
  
  // Set click handlers on all menu items
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", function() {
      // Hide menu when an item is clicked
      mobileMenuContent.classList.add("hidden");
      newMenuIcon.classList.remove("ph-x");
      newMenuIcon.classList.add("ph-list");
    });
  });
  
  // Add document click handler to close menu when clicking outside
  document.addEventListener("click", function(e) {
    if (!newMenuButton.contains(e.target) && 
        !mobileMenuContent.contains(e.target) && 
        !mobileMenuContent.classList.contains("hidden")) {
      mobileMenuContent.classList.add("hidden");
      newMenuIcon.classList.remove("ph-x");
      newMenuIcon.classList.add("ph-list");
    }
  });
  
  console.log("Mobile menu force-fixed");
}

window.addEventListener("DOMContentLoaded", async () => {
  // GSAP Animation Example
  gsap.from("header", { duration: 1, y: -100, opacity: 0, ease: "bounce" });
  gsap.from("main", { duration: 1.5, opacity: 0, delay: 0.5 });
  gsap.from("footer", { duration: 1.5, y: 100, opacity: 0, delay: 1 });

  // Force-fix the mobile menu immediately
  setTimeout(() => {
    forceFixMobileMenu();
  }, 100);

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
      
      // Re-apply force-fix after culture page loads
      setTimeout(() => {
        forceFixMobileMenu();
      }, 300);
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
    
    // Re-apply force-fix after destinasi page loads
    setTimeout(() => {
      forceFixMobileMenu();
    }, 300);
  } else {
    // Load the default app page
    app();
  }
});
