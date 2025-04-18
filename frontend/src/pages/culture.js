import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const culturePage = async () => {
  // Fetch the JSON data
  let indonesianCulture = [];
  try {
    const response = await fetch('/public/data/indonesianCulture.json');
    indonesianCulture = await response.json();
  } catch (error) {
    console.error("Error loading cultural data:", error);
  }

  // Create main container
  const section = document.createElement("section");
  section.id = "culture";
  section.className = "py-12 px-4 md:px-8 lg:px-16 bg-zinc-50";

  // Header section
  const header = document.createElement("div");
  header.className = "text-center mb-12";

  const title = document.createElement("h1");
  title.className = "text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4";
  title.textContent = "Pesona Budaya Indonesia";

  const subtitle = document.createElement("p");
  subtitle.className = "text-gray-600 max-w-3xl mx-auto text-sm md:text-base";
  subtitle.textContent = "Jelajahi keberagaman budaya dari 34 provinsi di Indonesia, mulai dari tarian tradisional, upacara adat, hingga kerajinan tangan yang menakjubkan.";

  header.append(title, subtitle);

  // Region filters
  const filterContainer = document.createElement("div");
  filterContainer.className = "mb-8 flex flex-wrap justify-center gap-2";

  // Get unique regions
  const regions = [...new Set(indonesianCulture.map(item => item.region))];
  
  // Add "All" filter
  const allFilter = document.createElement("button");
  allFilter.className = "px-4 py-2 rounded-full bg-sunset-orange text-white text-sm font-medium transition-all hover:bg-opacity-90";
  allFilter.textContent = "Semua";
  allFilter.setAttribute("data-region", "all");
  filterContainer.appendChild(allFilter);

  // Add region filters
  regions.forEach(region => {
    const filterBtn = document.createElement("button");
    filterBtn.className = "px-4 py-2 rounded-full bg-white border border-sunset-orange text-sunset-orange text-sm font-medium transition-all hover:bg-sunset-orange hover:text-white";
    filterBtn.textContent = region;
    filterBtn.setAttribute("data-region", region);
    filterContainer.appendChild(filterBtn);
  });

  // Cards container
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
  cardsContainer.id = "culture-cards";

  // Create cards for each culture
  indonesianCulture.forEach(culture => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1";
    card.setAttribute("data-id", culture.id);
    card.setAttribute("data-region", culture.region);

    // Image container
    const imgContainer = document.createElement("div");
    imgContainer.className = "h-48 overflow-hidden relative";
    
    const img = document.createElement("img");
    img.className = "w-full h-full object-cover transition-transform duration-500 hover:scale-110";
    img.src = culture.image;
    img.alt = culture.title;
    
    // Fallback image in case of load error
    img.onerror = function() {
      this.src = "https://via.placeholder.com/300x200?text=Budaya+Indonesia";
    };
    
    // Add loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center";
    
    const spinner = document.createElement("div");
    spinner.className = "w-8 h-8 border-4 border-sunset-orange border-t-transparent rounded-full animate-spin";
    
    loadingOverlay.appendChild(spinner);
    imgContainer.appendChild(loadingOverlay);
    imgContainer.appendChild(img);
    
    // Remove loading overlay when image loads
    img.onload = function() {
      loadingOverlay.remove();
    };

    // Card content
    const cardContent = document.createElement("div");
    cardContent.className = "p-4";
    
    const provinceTag = document.createElement("span");
    provinceTag.className = "inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2";
    provinceTag.textContent = culture.province;
    
    const cardTitle = document.createElement("h3");
    cardTitle.className = "text-lg font-bold text-primary mb-2 line-clamp-1";
    cardTitle.textContent = culture.title;
    
    const cardDesc = document.createElement("p");
    cardDesc.className = "text-sm text-gray-600 line-clamp-2";
    cardDesc.textContent = culture.description;
    
    cardContent.append(provinceTag, cardTitle, cardDesc);
    card.append(imgContainer, cardContent);
    cardsContainer.appendChild(card);
  });

  // Put everything together
  section.append(header, filterContainer, cardsContainer);

  // Create modal (initially hidden)
  const modal = createModal();
  section.appendChild(modal);

  // Initialize functionality after DOM insertion
  setTimeout(() => {
    initializeFunctionality(indonesianCulture);
    initializeAnimations();
  }, 100);

  return section;
};

// Create modal component
const createModal = () => {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center hidden";
  modalOverlay.id = "culture-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto";
  
  const modalHeader = document.createElement("div");
  modalHeader.className = "flex justify-between items-center p-4 border-b";
  
  const modalTitle = document.createElement("h3");
  modalTitle.className = "text-xl font-bold text-primary";
  modalTitle.id = "modal-title";
  
  const closeButton = document.createElement("button");
  closeButton.className = "text-gray-500 hover:text-gray-700";
  closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
  closeButton.id = "modal-close";
  
  modalHeader.append(modalTitle, closeButton);
  
  const modalBody = document.createElement("div");
  modalBody.className = "p-4";
  
  const modalImage = document.createElement("img");
  modalImage.className = "w-full h-64 object-cover rounded-lg mb-4";
  modalImage.id = "modal-image";
  
  const modalProvince = document.createElement("div");
  modalProvince.className = "flex items-center gap-2 mb-4";
  
  const provinceIcon = document.createElement("span");
  provinceIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sunset-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';
  
  const provinceText = document.createElement("span");
  provinceText.className = "text-gray-600";
  provinceText.id = "modal-province";
  
  modalProvince.append(provinceIcon, provinceText);
  
  const modalRegion = document.createElement("div");
  modalRegion.className = "flex items-center gap-2 mb-4";
  
  const regionIcon = document.createElement("span");
  regionIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sunset-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  
  const regionText = document.createElement("span");
  regionText.className = "text-gray-600";
  regionText.id = "modal-region";
  
  modalRegion.append(regionIcon, regionText);
  
  const modalDescription = document.createElement("p");
  modalDescription.className = "text-gray-800 mb-4";
  modalDescription.id = "modal-description";
  
  modalBody.append(modalImage, modalProvince, modalRegion, modalDescription);
  modalContent.append(modalHeader, modalBody);
  modalOverlay.appendChild(modalContent);
  
  return modalOverlay;
};

// Initialize page functionality
const initializeFunctionality = (indonesianCulture) => {
  // Filter functionality
  const filterButtons = document.querySelectorAll("[data-region]");
  const cards = document.querySelectorAll("#culture-cards > div");
  
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Update button styles
      filterButtons.forEach(btn => {
        if (btn === button) {
          btn.classList.remove("bg-white", "text-sunset-orange", "border-sunset-orange");
          btn.classList.add("bg-sunset-orange", "text-white");
        } else {
          btn.classList.remove("bg-sunset-orange", "text-white");
          btn.classList.add("bg-white", "text-sunset-orange", "border-sunset-orange");
        }
      });
      
      const selectedRegion = button.getAttribute("data-region");
      
      // Show/hide cards based on region
      cards.forEach(card => {
        if (selectedRegion === "all" || card.getAttribute("data-region") === selectedRegion) {
          card.classList.remove("hidden");
          // Add animation
          gsap.from(card, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
            stagger: 0.05
          });
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
  
  // Modal functionality
  const modal = document.getElementById("culture-modal");
  const closeModalBtn = document.getElementById("modal-close");
  
  // Close modal when clicking the close button
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  // Close modal when clicking outside the modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
  
  // Close modal when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  });
  
  // Open modal when clicking a card
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.getAttribute("data-id"));
      const cultureItem = indonesianCulture.find(item => item.id === id);
      
      if (cultureItem) {
        // Populate modal with data
        document.getElementById("modal-title").textContent = cultureItem.title;
        
        const modalImage = document.getElementById("modal-image");
        modalImage.src = cultureItem.image;
        modalImage.onerror = function() {
          this.src = "https://via.placeholder.com/800x400?text=Budaya+Indonesia";
        };
        
        document.getElementById("modal-province").textContent = cultureItem.province;
        document.getElementById("modal-region").textContent = cultureItem.region;
        document.getElementById("modal-description").textContent = cultureItem.details;
        
        // Show modal
        modal.classList.remove("hidden");
      }
    });
  });
};

// Initialize animations
const initializeAnimations = () => {
  // Animate header
  gsap.from("#culture h1", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
  
  gsap.from("#culture p", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out"
  });
  
  // Animate filter buttons
  gsap.from("#culture button", {
    y: -10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.4,
    ease: "power1.out"
  });
  
  // Animate cards on scroll
  const cards = document.querySelectorAll("#culture-cards > div");
  gsap.from(cards, {
    scrollTrigger: {
      trigger: "#culture-cards",
      start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: "power2.out"
  });
};

export default culturePage; 