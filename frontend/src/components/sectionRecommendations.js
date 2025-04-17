import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

const sectionRecommendations = async (id) => {
  const section = document.createElement('section');
  section.className = 'mt-12 m-12';

  const title = document.createElement('h2');
  title.className = 'text-xl md:text-2xl lg:text-4xl font-semibold text-primary mb-6 text-center';
  title.textContent = 'Rekomendasi Destinasi Mirip';

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  // Ambil rekomendasi dari backend
  try {
    const res = await fetch(`http://localhost:9000/destinasi/${id}/recommendations`);
    const json = await res.json();

    if (json.status === 'success') {
      json.data.forEach((item) => {
        grid.appendChild(cardItem(item));
      });
    } else {
      const errorText = document.createElement('p');
      errorText.textContent = 'Tidak ada rekomendasi yang tersedia.';
      grid.appendChild(errorText);
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }

  section.append(title, grid);
  return section;
};

// Fungsi untuk membuat card destinasi
const cardItem = (data) => {
    const { Name, Province, Regency, Description, images } = data;

    const card = document.createElement('div');
    card.className =
        'relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-white min-h-[360px] flex flex-col justify-end group';

    const imageUrl = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300';
    card.style.backgroundImage = `url('${imageUrl}')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';

    const overlay = document.createElement('div');
    overlay.className =
        'bg-gradient-to-t from-black/80 via-black/50 to-transparent h-full w-full p-5 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90 group-hover:via-black/70';

    const h3 = document.createElement('h3');
    h3.className = 'text-lg md:text-xl font-bold leading-tight mb-1';
    h3.textContent = Name;

    const loc = document.createElement('p');
    loc.className = 'text-sm mb-1';
    loc.textContent = `${Regency}, ${Province}`;

    const desc = document.createElement('p');
    desc.className = 'text-xs mb-2';
    desc.textContent = Description;

    const button = document.createElement('button');
    button.className =
        'bg-blue-600/90 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg w-fit hover:cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg';
    button.textContent = 'Explore Destination';
    button.setAttribute("data-id", data.ID);

    // pas diklik, langsung redirect ke detail (dengan query param id)
    button.addEventListener("click", (e) => {
      const destinationId = e.target.getAttribute("data-id");
      if (destinationId) {
        window.location.href = `?id=${destinationId}`;
      } else {
        alert("ID destinasi tidak valid.");
      }
    });
  

    overlay.append(h3, loc, desc, button);
    card.append(overlay);

    return card;
};

export default sectionRecommendations;