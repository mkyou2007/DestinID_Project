import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Base64 encoded placeholder image
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y1REVCMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMxRDNDMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJ1ZGF5YSBJbmRvbmVzaWE8L3RleHQ+PC9zdmc+";

// Default culture data in case fetch fails
const DEFAULT_CULTURE_DATA = [
  {
    id: 1,
    province: "Indonesia",
    region: "Default",
    title: "Budaya Indonesia",
    description: "Data budaya tidak dapat dimuat. Silakan coba lagi nanti.",
    image: placeholderImage,
    details: "Maaf, data budaya tidak tersedia saat ini."
  }
];

// Function to verify image URL
const getValidImageSrc = (imageUrl) => {
  // Image URL patterns known to cause issues
  const problematicDomains = [
    'awsimages.detik.net.id',
    'blue.kumparan.com',
    'i0.wp.com',
    'i.postimg.cc',
    'dynamic-media-cdn.tripadvisor.com',
    'kelaspintar-prod-sg.s3.ap-southeast-1.amazonaws.com',
    'imgx.sonora.id',
    'sumberbelajar.belajar.kemdikbud.go.id',
    'cdn.antaranews.com',
    'www.indonesiakaya.com',
    'asset.kompas.com',
    'nilawarni.files.wordpress.com'
  ];
  
  // Check if URL contains any of the problematic domains or is empty
  if (!imageUrl || typeof imageUrl !== 'string' || problematicDomains.some(domain => imageUrl.includes(domain))) {
    return placeholderImage;
  }
  
  return imageUrl;
};

const culturePage = async () => {
  // Fetch the JSON data
  let indonesianCulture = [];
  try {
    // Try multiple paths in case one fails
    let response;
    try {
      response = await fetch('/data/indonesianCulture.json');
      if (!response.ok) throw new Error('First path failed');
    } catch (e) {
      try {
        response = await fetch('./data/indonesianCulture.json');
        if (!response.ok) throw new Error('Second path failed');
      } catch (e) {
        response = await fetch('./indonesianCulture.json');
      }
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    try {
      indonesianCulture = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Response text:", text.substring(0, 100) + "...");
      throw parseError;
    }
    
    // Pre-process the JSON data to fix image URLs
    indonesianCulture = indonesianCulture.map(culture => ({
      ...culture,
      image: getValidImageSrc(culture.image)
    }));
    
  } catch (error) {
    console.error("Error loading cultural data:", error);
    // Use default data if fetch fails
    indonesianCulture = DEFAULT_CULTURE_DATA;
  }

  // Main container with parallax background - IMPORTANT: don't use fixed positioning that might overlay the navbar
  const section = document.createElement("section");
  section.id = "culture";
  section.className = "relative min-h-screen bg-gradient-to-b from-zinc-50 to-amber-50 py-16 px-4 md:px-8 lg:px-16 mt-2";
  section.style.zIndex = "1"; // Ensure it doesn't overlap with header/navbar

  // Create decorative elements
  const createDecorations = () => {
    const decorContainer = document.createElement("div");
    decorContainer.className = "absolute inset-0 overflow-hidden pointer-events-none z-0";
    
    // Batik pattern top-right
    const batikTopRight = document.createElement("div");
    batikTopRight.className = "absolute -top-24 -right-24 w-64 h-64 opacity-5 rotate-45 pointer-events-none";
    batikTopRight.style.backgroundImage = "url('https://i.pinimg.com/736x/77/b0/e7/77b0e77014a527e5ed0bcc6e1091c660.jpg')";
    batikTopRight.style.backgroundSize = "cover";
    
    // Batik pattern bottom-left
    const batikBottomLeft = document.createElement("div");
    batikBottomLeft.className = "absolute -bottom-24 -left-24 w-64 h-64 opacity-5 -rotate-45 pointer-events-none";
    batikBottomLeft.style.backgroundImage = "url('https://i.pinimg.com/736x/77/b0/e7/77b0e77014a527e5ed0bcc6e1091c660.jpg')";
    batikBottomLeft.style.backgroundSize = "cover";
    
    decorContainer.append(batikTopRight, batikBottomLeft);
    return decorContainer;
  };
  
  section.appendChild(createDecorations());

  // Header section with animated title
  const header = document.createElement("div");
  header.className = "relative text-center mb-16 max-w-4xl mx-auto";

  const decoration = document.createElement("div");
  decoration.className = "absolute left-1/2 -translate-x-1/2 top-0 -mt-6 text-sunset-orange opacity-10 text-[120px] font-bold";
  decoration.textContent = "BUDAYA";
  
  const title = document.createElement("h1");
  title.className = "text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 relative";
  title.innerHTML = "Pesona <span class='text-sunset-orange'>Budaya</span> Indonesia";

  const divider = document.createElement("div");
  divider.className = "w-20 h-1 bg-sunset-orange mx-auto mb-6";

  const subtitle = document.createElement("p");
  subtitle.className = "text-gray-600 max-w-3xl mx-auto text-base md:text-lg";
  subtitle.textContent = "Jelajahi keberagaman budaya dari 34 provinsi di Indonesia, mulai dari tarian tradisional, upacara adat, hingga kerajinan tangan yang menakjubkan.";

  header.append(decoration, title, divider, subtitle);

  // Search section
  const searchContainer = document.createElement("div");
  searchContainer.className = "max-w-xl mx-auto mb-12";
  
  const searchForm = document.createElement("form");
  searchForm.className = "flex items-center relative";
  searchForm.id = "search-form";
  searchForm.onsubmit = (e) => e.preventDefault();
  
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Cari budaya Indonesia...";
  searchInput.className = "w-full py-3 px-5 pr-12 rounded-full border-2 border-gray-200 focus:border-sunset-orange focus:outline-none shadow-sm";
  searchInput.id = "search-input";
  
  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.className = "absolute right-3 text-sunset-orange";
  searchButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>';
  
  searchForm.append(searchInput, searchButton);
  searchContainer.appendChild(searchForm);

  // Region filters with improved design
  const filterContainer = document.createElement("div");
  filterContainer.className = "mb-12";
  
  const filterTitle = document.createElement("h3");
  filterTitle.className = "text-lg font-semibold mb-4 text-center text-primary";
  filterTitle.textContent = "Filter berdasarkan Wilayah";
  
  const filterButtons = document.createElement("div");
  filterButtons.className = "flex flex-wrap justify-center gap-2 max-w-4xl mx-auto";
  
  // Get unique regions
  const regions = [...new Set(indonesianCulture.map(item => item.region))].filter(Boolean).sort();
  
  // Add "All" filter
  const allFilter = document.createElement("button");
  allFilter.className = "px-4 py-2 rounded-full bg-sunset-orange text-white text-sm font-medium transition-all hover:bg-opacity-90 shadow-sm";
  allFilter.textContent = "Semua";
  allFilter.setAttribute("data-region", "all");
  filterButtons.appendChild(allFilter);

  // Add region filters
  regions.forEach(region => {
    const filterBtn = document.createElement("button");
    filterBtn.className = "px-4 py-2 rounded-full bg-white border border-sunset-orange text-sunset-orange text-sm font-medium transition-all hover:bg-sunset-orange hover:text-white shadow-sm";
    filterBtn.textContent = region;
    filterBtn.setAttribute("data-region", region);
    filterButtons.appendChild(filterBtn);
  });
  
  filterContainer.append(filterTitle, filterButtons);

  // Masonry-like grid for cards
  const gridContainer = document.createElement("div");
  gridContainer.className = "max-w-7xl mx-auto";
  
  // Empty state container
  const emptyState = document.createElement("div");
  emptyState.className = "hidden text-center py-16";
  emptyState.id = "empty-state";
  
  const emptyIcon = document.createElement("div");
  emptyIcon.className = "text-gray-300 mx-auto mb-4";
  emptyIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  
  const emptyText = document.createElement("h3");
  emptyText.className = "text-xl font-semibold text-gray-500";
  emptyText.textContent = "Tidak ada hasil yang ditemukan";
  
  const emptySubtext = document.createElement("p");
  emptySubtext.className = "text-gray-400";
  emptySubtext.textContent = "Coba kata kunci atau filter lain";
  
  emptyState.append(emptyIcon, emptyText, emptySubtext);
  
  // Cards container
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
  cardsContainer.id = "culture-cards";

  // Create improved cards for each culture
  indonesianCulture.forEach(culture => {
    if (!culture || !culture.id) {
      return;
    }
    
    const card = document.createElement("div");
    card.className = "group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative";
    card.setAttribute("data-id", culture.id);
    card.setAttribute("data-region", culture.region || "Unknown");
    card.setAttribute("data-title", culture.title || "");
    card.setAttribute("data-province", culture.province || "");

    const imgContainer = document.createElement("div");
    imgContainer.className = "h-52 overflow-hidden relative";
    
    const img = document.createElement("img");
    img.className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";
    img.src = culture.image;
    img.alt = culture.title;
    
    img.onerror = function() {
      this.src = placeholderImage;
      
      if (imgContainer.querySelector(".absolute")) {
        imgContainer.querySelector(".absolute").remove();
      }
    };
    
    // Add loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center";
    
    const spinner = document.createElement("div");
    spinner.className = "w-8 h-8 border-4 border-sunset-orange border-t-transparent rounded-full animate-spin";
    
    loadingOverlay.appendChild(spinner);
    imgContainer.appendChild(loadingOverlay);
    imgContainer.appendChild(img);
    
    img.onload = function() {
      loadingOverlay.remove();
    };

    // Image overlay gradient
    const imgOverlay = document.createElement("div");
    imgOverlay.className = "absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300";
    imgContainer.appendChild(imgOverlay);

    // Card content
    const cardContent = document.createElement("div");
    cardContent.className = "p-5";
    
    const provinceTag = document.createElement("span");
    provinceTag.className = "inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-3";
    provinceTag.textContent = culture.province;
    
    const cardTitle = document.createElement("h3");
    cardTitle.className = "text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-sunset-orange transition-colors";
    cardTitle.textContent = culture.title;
    
    const cardDesc = document.createElement("p");
    cardDesc.className = "text-sm text-gray-600 line-clamp-2";
    cardDesc.textContent = culture.description;
    
    // Read more button
    const readMore = document.createElement("button");
    readMore.className = "mt-4 text-sunset-orange text-sm font-medium flex items-center group-hover:underline";
    readMore.innerHTML = 'Selengkapnya <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>';
    
    cardContent.append(provinceTag, cardTitle, cardDesc, readMore);
    card.append(imgContainer, cardContent);
    cardsContainer.appendChild(card);
  });

  gridContainer.append(cardsContainer, emptyState);
  section.append(header, searchContainer, filterContainer, gridContainer);

  // Create enhanced modal
  const modal = createEnhancedModal();
  section.appendChild(modal);
  
  setTimeout(() => {
    initializeFiltersAndSearch(indonesianCulture);
    initializeModal(indonesianCulture);
    initializeAnimations();
    
    // Fix navigation links without interfering with mobile menu
    fixNavigationLinks();
    
    // Make sure mobile menu has the hidden class initially
    const mobileMenuContent = document.getElementById("mobile-menu-content");
    if (mobileMenuContent && !mobileMenuContent.classList.contains("hidden")) {
      mobileMenuContent.classList.add("hidden");
    }
  }, 100);

  return section;
};

// Create enhanced modal with better UI
const createEnhancedModal = () => {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center hidden";
  modalOverlay.id = "culture-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative";
  
  // Close button (top-right corner)
  const closeButton = document.createElement("button");
  closeButton.className = "absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10";
  closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
  closeButton.id = "modal-close";
  
  // Modal content structure (two columns on desktop)
  const modalBody = document.createElement("div");
  modalBody.className = "md:grid md:grid-cols-2 md:gap-6";
  
  // Left column (image)
  const imageCol = document.createElement("div");
  imageCol.className = "relative h-72 md:h-full";
  
  const modalImage = document.createElement("img");
  modalImage.className = "w-full h-full object-cover md:rounded-l-xl";
  modalImage.id = "modal-image";
  
  // Image gradient overlay
  const imageOverlay = document.createElement("div");
  imageOverlay.className = "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r";
  
  imageCol.append(modalImage, imageOverlay);
  
  // Right column (content)
  const contentCol = document.createElement("div");
  contentCol.className = "p-6 md:p-8";
  
  const modalTitle = document.createElement("h2");
  modalTitle.className = "text-2xl md:text-3xl font-bold text-primary mb-4";
  modalTitle.id = "modal-title";
  
  const modalMetadata = document.createElement("div");
  modalMetadata.className = "flex flex-wrap gap-4 mb-6";
  
  const modalProvince = document.createElement("div");
  modalProvince.className = "flex items-center gap-2";
  
  const provinceIcon = document.createElement("span");
  provinceIcon.className = "text-sunset-orange";
  provinceIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';
  
  const provinceText = document.createElement("span");
  provinceText.className = "text-gray-600";
  provinceText.id = "modal-province";
  
  modalProvince.append(provinceIcon, provinceText);
  
  const modalRegion = document.createElement("div");
  modalRegion.className = "flex items-center gap-2";
  
  const regionIcon = document.createElement("span");
  regionIcon.className = "text-sunset-orange";
  regionIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  
  const regionText = document.createElement("span");
  regionText.className = "text-gray-600";
  regionText.id = "modal-region";
  
  modalRegion.append(regionIcon, regionText);
  modalMetadata.append(modalProvince, modalRegion);
  
  const contentDivider = document.createElement("div");
  contentDivider.className = "w-16 h-1 bg-sunset-orange mb-6";
  
  const modalDescription = document.createElement("div");
  modalDescription.className = "prose text-gray-700";
  modalDescription.id = "modal-description";
  
  contentCol.append(modalTitle, modalMetadata, contentDivider, modalDescription);
  
  modalBody.append(imageCol, contentCol);
  modalContent.append(closeButton, modalBody);
  modalOverlay.appendChild(modalContent);
  
  return modalOverlay;
};

// Initialize enhanced filters and search functionality
const initializeFiltersAndSearch = () => {
  const filterButtons = document.querySelectorAll("[data-region]");
  const cards = document.querySelectorAll("#culture-cards > div");
  const searchInput = document.getElementById("search-input");
  const searchForm = document.getElementById("search-form");
  const emptyState = document.getElementById("empty-state");
  
  // Initialize with "all" filter active
  const allFilterBtn = document.querySelector("[data-region='all']");
  if (allFilterBtn) {
    allFilterBtn.classList.remove("bg-white", "text-sunset-orange", "border-sunset-orange");
    allFilterBtn.classList.add("bg-sunset-orange", "text-white");
  }
  
  // Search functionality
  const handleSearch = () => {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedRegion = document.querySelector("[data-region].bg-sunset-orange").getAttribute("data-region");
    
    // Filter cards based on search term and selected region
    let visibleCount = 0;
    
    cards.forEach(card => {
      const cardTitle = card.getAttribute("data-title").toLowerCase();
      const cardProvince = card.getAttribute("data-province").toLowerCase();
      const cardRegion = card.getAttribute("data-region");
      
      const matchesSearch = cardTitle.includes(searchValue) || cardProvince.includes(searchValue);
      const matchesRegion = selectedRegion === "all" || cardRegion === selectedRegion;
      
      if (matchesSearch && matchesRegion) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });
    
    // Show empty state if no results
    if (visibleCount === 0) {
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
    }
  };
  
  // Search input event listener
  searchInput.addEventListener("input", handleSearch);
  
  // Search form submit
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch();
  });
  
  // Region filter buttons
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
      
      // Trigger search to update results
      handleSearch();
      
      // Animate visible cards
      setTimeout(() => {
        const visibleCards = document.querySelectorAll("#culture-cards > div:not(.hidden)");
        gsap.from(visibleCards, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power1.out",
          clearProps: "all"
        });
      }, 10);
    });
  });
};

// Initialize modal with improved functionality
const initializeModal = (indonesianCulture) => {
  const modal = document.getElementById("culture-modal");
  const closeModalBtn = document.getElementById("modal-close");
  const cards = document.querySelectorAll("#culture-cards > div");
  
  // Close modal when clicking the close button
  closeModalBtn.addEventListener("click", () => {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.classList.add("hidden");
        modal.style.opacity = 1;
      }
    });
  });
  
  // Close modal when clicking outside the modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          modal.classList.add("hidden");
          modal.style.opacity = 1;
        }
      });
    }
  });
  
  // Close modal when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          modal.classList.add("hidden");
          modal.style.opacity = 1;
        }
      });
    }
  });
  
  // Open modal with animation when clicking a card
  cards.forEach(card => {
    card.addEventListener("click", () => {
      try {
        const id = parseInt(card.getAttribute("data-id"));
        const cultureItem = indonesianCulture.find(item => item.id === id);
        
        if (cultureItem) {
          // Populate modal with data
          document.getElementById("modal-title").textContent = cultureItem.title || "Untitled";
          
          const modalImage = document.getElementById("modal-image");
          modalImage.src = getValidImageSrc(cultureItem.image);
          modalImage.alt = cultureItem.title;
          modalImage.onerror = function() {
            this.src = placeholderImage;
          };
          
          document.getElementById("modal-province").textContent = cultureItem.province || "Unknown";
          document.getElementById("modal-region").textContent = cultureItem.region || "Unknown";
          
          // Format description with paragraphs
          const descriptionElement = document.getElementById("modal-description");
          const details = cultureItem.details || cultureItem.description || "No details available";
          
          // Split text into paragraphs and apply formatting
          const paragraphs = details.split('\n').filter(p => p.trim());
          descriptionElement.innerHTML = '';
          
          if (paragraphs.length > 0) {
            paragraphs.forEach(paragraph => {
              const p = document.createElement('p');
              p.textContent = paragraph;
              descriptionElement.appendChild(p);
            });
          } else {
            const p = document.createElement('p');
            p.textContent = details;
            descriptionElement.appendChild(p);
          }
          
          // Show modal with animation
          modal.classList.remove("hidden");
          modal.style.opacity = 0;
          
          gsap.fromTo(modal, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
          );
          
          gsap.fromTo(document.querySelector("#culture-modal > div"), 
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.1 }
          );
        }
      } catch (error) {
        console.error("Error opening modal:", error);
      }
    });
  });
};

// Enhanced animations
const initializeAnimations = () => {
  // Animate header elements
  gsap.from("#culture h1", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
  
  gsap.from("#culture h1 + div", {
    scaleX: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out"
  });
  
  gsap.from("#culture header p", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out"
  });
  
  // Animate search form
  gsap.from("#search-form", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: 0.6,
    ease: "back.out(1.7)"
  });
  
  // Animate filter section
  gsap.from("#culture h3", {
    opacity: 0,
    duration: 0.5,
    delay: 0.7,
    ease: "power1.out"
  });
  
  gsap.from("#culture button", {
    y: -10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    delay: 0.8,
    ease: "power1.out"
  });
  
  // Animate cards on scroll with stagger
  const cards = document.querySelectorAll("#culture-cards > div");
  ScrollTrigger.batch(cards, {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true
    }),
    start: "top 85%"
  });
  
  // Set initial state for cards
  gsap.set(cards, { y: 30, opacity: 0 });
};

// Fix navigation links without modifying DOM structure
const fixNavigationLinks = () => {
  // Set absolute URLs for proper navigation
  const homepageUrl = window.location.origin || "/";
  
  
  // DO NOT modify any existing HTML structure - only add event listeners
  
  // Simply add proper click handlers to navigation elements
  const addHomeClickHandler = (id) => {
    const link = document.getElementById(id);
    if (link) {
      // Don't modify href - just handle the click
      link.addEventListener("click", function() {
        
        window.location.href = homepageUrl;
      });
    }
  };
  
  const addSectionClickHandler = (id, section) => {
    const link = document.getElementById(id);
    if (link) {
      // Don't modify href - just handle the click
      link.addEventListener("click", function() {
        
        window.location.href = homepageUrl + section;
      });
    }
  };
  
  // Add click handlers - but leave all HTML structure intact
  addHomeClickHandler("nav-home");
  addHomeClickHandler("mobile-nav-home");
  addSectionClickHandler("nav-destinations", "#destinations");
  addSectionClickHandler("mobile-nav-destinations", "#destinations");
  addSectionClickHandler("nav-about", "#about");
  addSectionClickHandler("mobile-nav-about", "#about");
  
  // Make site logo clickable without changing HTML
  const siteLogo = document.getElementById("site-logo");
  if (siteLogo) {
    siteLogo.style.cursor = "pointer";
    siteLogo.addEventListener("click", function() {
      window.location.href = homepageUrl;
    });
  }
  
  // DO NOT try to re-implement mobile menu - just verify it exists
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenuContent = document.getElementById("mobile-menu-content");
  const menuIcon = document.getElementById("menu-icon");
  
  // Add mobile menu toggle that matches the main.js implementation
  if (mobileMenuButton && mobileMenuContent && menuIcon) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuContent.classList.toggle('hidden');
      
      // Toggle icon between hamburger and X
      if (!mobileMenuContent.classList.contains("hidden")) {
        menuIcon.classList.remove("ph-list");
        menuIcon.classList.add("ph-x");
      } else {
        menuIcon.classList.remove("ph-x");
        menuIcon.classList.add("ph-list");
      }
    });
    
    // Close menu when clicking menu items
    const mobileMenuItems = document.querySelectorAll(".menu-item");
    mobileMenuItems.forEach(item => {
      item.addEventListener("click", function() {
        mobileMenuContent.classList.add("hidden");
        menuIcon.classList.remove("ph-x");
        menuIcon.classList.add("ph-list");
      });
    });
  }
};

export default culturePage; 