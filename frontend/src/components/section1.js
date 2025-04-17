import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ============== Hero Section with Image Carousel ===============
const section1 = () => {
  const section = document.createElement("section");
  section.id = "home"; // Set ID to home for navigation
  section.className = "relative w-full h-screen overflow-hidden";

  // ============= Hero Container ===============
  const heroContainer = document.createElement("div");
  heroContainer.className = "w-full h-full relative";
  
  // ============= Images Array ===============
  const images = [
    "./herosectionAssets/1.svg",
    "./herosectionAssets/2.svg",
    "./herosectionAssets/3.svg",
    "./herosectionAssets/4.svg",
    "./herosectionAssets/5.svg"
  ];
  
  // ============= Create Slides ===============
  images.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = `absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out${index === 0 ? ' opacity-100' : ' opacity-0'}`;
    slide.style.backgroundImage = `url('${img}')`;
    slide.setAttribute("data-slide", index);
    heroContainer.appendChild(slide);
  });
  
  // ============= Overlay for Text ===============
  const overlay = document.createElement("div");
  overlay.className = "absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 md:p-8";
  
  // ============= Title ============
  const title = document.createElement("h1");
  title.className = "text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-fadeIn";
  title.textContent = "Eksplorasi Keajaiban Indonesia yang Tersembunyi";

  // ============= Subtitle ==================
  const subtitle = document.createElement("p");
  subtitle.className = "text-white text-sm md:text-lg max-w-xl drop-shadow-lg animate-fadeIn";
  subtitle.textContent = "Rasakan perjalanan virtual melintasi keindahan alam Indonesia, kekayaan budaya, dan kisah-kisah yang belum terungkap";

  // ============= CTA Button ==================
  const ctaButton = document.createElement("button");
  ctaButton.className = "mt-6 px-6 py-3 bg-sunset-orange text-white font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 animate-fadeIn";
  ctaButton.textContent = "Jelajahi Sekarang";
  ctaButton.addEventListener("click", () => {
    const destinationsElement = document.getElementById("destinations");
    if (destinationsElement) {
      destinationsElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback - scroll down a good amount if the element doesn't exist
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }
  });

  // ============= Add Navigation Dots ==================
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "absolute bottom-8 left-0 right-0 flex justify-center space-x-2";
  
  // Define switchSlide function in outer scope
  let switchSlide;
  
  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white scale-110' : 'bg-white/50'}`;
    dot.setAttribute("data-slide-index", index);
    dot.addEventListener("click", () => {
      if (switchSlide) switchSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  overlay.append(title, subtitle, ctaButton);
  heroContainer.appendChild(overlay);
  heroContainer.appendChild(dotsContainer);
  section.appendChild(heroContainer);

  // Carousel functionality to be initialized after DOM insertion
  setTimeout(() => {
    let currentSlide = 0;
    const slides = section.querySelectorAll("[data-slide]");
    const dots = section.querySelectorAll("[data-slide-index]");
    const slideCount = slides.length;
    let slideInterval;

    // Function to switch slides
    switchSlide = (index) => {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove("opacity-100");
        slide.classList.add("opacity-0");
      });
      
      // Update dots
      dots.forEach(dot => {
        dot.classList.remove("bg-white", "scale-110");
        dot.classList.add("bg-white/50");
      });
      
      // Show selected slide
      slides[index].classList.remove("opacity-0");
      slides[index].classList.add("opacity-100");
      
      // Update active dot
      dots[index].classList.remove("bg-white/50");
      dots[index].classList.add("bg-white", "scale-110");
      
      currentSlide = index;
    };

    // Auto-advance slides
    const startSlideShow = () => {
      slideInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slideCount;
        switchSlide(nextSlide);
      }, 5000); // Change slide every 5 seconds
    };

    // Pause on hover
    heroContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });
    
    // Resume on mouse leave
    heroContainer.addEventListener("mouseleave", () => {
      startSlideShow();
    });

    // Start the slideshow
    startSlideShow();

    // Set up GSAP animations
    gsap.from("#home", {
      scrollTrigger: {
        trigger: "#home",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out",
    });
  }, 100);

  return section;
};

export default section1;
