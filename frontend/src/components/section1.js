import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ============== ini div isi gambar+judul di halaman utama ===============
const section1 = () => {
  const section = document.createElement("section");
  section.id = "section1"; // Add a unique ID for the section
  // ============= ini div gambarnya pakai bg=[] ===============

  const divsection = document.createElement("div");
  divsection.className =
    "w-full h-80 md:h-[32rem] bg-[url('https://www.celebes.co/wp-content/uploads/2019/10/Tentang-Bukit-Kasih-Kanonang.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-center gap-5 p-4 md:p-8";

  // ============= ini judul nya ============
  const titlesection = document.createElement("h1");
  titlesection.className =
    "text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow";
  titlesection.textContent = "Eksplorasi Keajaiban Indonesia yang Tersembunyi";

  // =================== ini paragraf di bawah judul ==================
  const paragrafsection = document.createElement("p");

  paragrafsection.className =
    "text-white text-sm md:text-lg max-w-xl drop-shadow";

  paragrafsection.textContent =
    "Rasakan perjalanan virtual melintasi keindahan alam Indonesia, kekayaan budaya, dan kisah-kisah yang belum terungkap";

  divsection.append(titlesection, paragrafsection);
  section.append(divsection);

  // Set up GSAP animations AFTER the element is in the DOM
  setTimeout(() => {
    gsap.from("#section1", {
      scrollTrigger: {
        trigger: "#section1",
        start: "top 80%", // Animasi dimulai saat 80% dari elemen terlihat
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
