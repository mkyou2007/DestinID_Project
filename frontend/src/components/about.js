
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//  ================ ini untuk halaman about ================
const createEl = (tag, className = "", text = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

const sectionAbout = () => {
  const section = createEl("section",  "   py-16 bg-sand-yellow bg-opacity-20 ");
  section.id = "about";

  const container = createEl("div", "container mx-auto px-4 md:px-8 lg:px-12");
  section.appendChild(container);

  const flexContainer = createEl("div", "flex flex-col lg:flex-row gap-8 items-center");
  container.appendChild(flexContainer);

  // Main Image
  const imageContainer = createEl("div", "w-full lg:w-2/5");
  const image = createEl("img", "w-full h-auto rounded-lg shadow-lg");
  image.src = "./public/assets/ii.svg";
  image.alt = "Indonesian Mountain Landscape";
  imageContainer.appendChild(image);
  flexContainer.appendChild(imageContainer);

  // Text Content
  const textContainer = createEl("div", "w-full lg:w-3/5");
  const textContent = createEl("div", "mb-6");

  const h3 = createEl("h3", "text-forest-green font-manrope text-xl font-bold mb-1", "Destin");
  const span = createEl("span", "text-sunset-orange", "ID");
  h3.appendChild(span);
  textContent.appendChild(h3);

  const h2 = createEl("h2", "text-3xl md:text-4xl font-manrope font-bold text-gray-800 mb-4", "Destinasi Indonesia");
  textContent.appendChild(h2);

  const paragraph = createEl("p", "font-opensans text-gray-700 mb-6",
    "Indonesia adalah negara dengan warisan budaya yang kaya dan keindahan alam yang memukau. Dari sawah terasering yang hijau di Bali hingga gunung-gunung yang megah di Sumatera, ada sesuatu untuk semua orang untuk dijelajahi. Apakah Anda mencari petualangan, relaksasi, atau rasa budaya lokal, Indonesia memiliki semuanya. Dengan lanskap yang beragam dan komunitas yang dinamis, tidak heran bahwa Indonesia adalah tujuan utama bagi wisatawan dari seluruh dunia."
  );
  textContent.appendChild(paragraph);
  textContainer.appendChild(textContent);
  flexContainer.appendChild(textContainer);

  return section;

};

gsap.from("section", {
  scrollTrigger: {
    trigger: "section",
    start: "top 80%", // Animasi dimulai saat 80% dari elemen terlihat
    toggleActions: "play none none none",
  },
  duration: 1,
  y: 50,
  opacity: 0,
  ease: "power2.out",
});

export default sectionAbout;
