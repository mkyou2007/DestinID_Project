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

// ================= bikin elemen HTML biar gak ngulang-ngulang =================
const createEl = (tag, className = "", text = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

// API configuration with fallback data
const apiConfig = {
  url: "http://localhost:9000/destinasi",
  // Fallback data to use when API is unavailable
  fallbackData: [
    {
      ID: 1,
      Name: "Masjid Raya Labui",
      Province: "Aceh",
      Regency: "Pidie",
      Category: "Religious",
      Price: 0,
      Rating: 4.8,
      images: [
        "https://assets.kompasiana.com/items/album/2021/04/30/rappler-608c18bfd541df686e1cbf95.jpeg"
      ],
      Description: "Masjid Po Teumeureuhom atau Masjid Labui adalah sebuah masjid yang terletak di Kabupaten Pidie, Aceh."
    },
    {
      ID: 2,
      Name: "Danau Aek Natonang",
      Province: "North Sumatra",
      Regency: "Samosir",
      Category: "Nature",
      Price: 10000,
      Rating: 4.8,
      images: [
        "https://asset-2.tstatic.net/tribunnews/foto/bank/images/danau-aek-natonang-1.jpg"
      ],
      Description: "Aek Natonang adalah danau di atas Pulau Samosir yang terletak di Danau Toba, sehingga dijuluki danau di atas danau."
    },
    {
      ID: 3,
      Name: "Masjid Tuo Pincuran Gadang",
      Province: "West Sumatera",
      Regency: "Agam",
      Category: "Religious",
      Price: 0,
      Rating: 4.8,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSPyZQ-GJxQJi7QnR4cBXsCUiNpoynkxY5qmFPMA3A7hlT_O3x74mAodH_Dp8mjt-HSU&amp;usqp=CAU"
      ],
      Description: "Masjid Pincuran Gadang adalah masjid yang berada di sebuah lembah bernama Pincuran Gadang di Kecamatan Matua, Kabupaten Agam, Sumatera Barat."
    },
    {
      ID: 4,
      Name: "Candi Gedongsongo",
      Province: "Central Java",
      Regency: "Semarang",
      Category: "History",
      Price: 15000,
      Rating: 4.6,
      images: [
        "https://asset.kompas.com/crops/PLERYctRVlKlFY-ZkH1JP3TWRBg=/23x0:1003x653/1200x800/data/photo/2021/12/26/61c8581af190b.png"
      ],
      Description: "Candi Gedongsongo adalah nama sebuah kompleks bangunan candi peninggalan budaya Hindu di lereng Gunung Ungaran."
    }
  ]
};

const section2 = async () => {
  const section = createEl("section", "py-16");
  section.id = "destinations"; // Add ID for navigation
  const container = createEl("div", "max-w-6xl mx-auto px-4");

  container.append(headerContent());

  const filterContainer = createEl("div", "flex justify-center mb-6");
  const filterSelect = createEl(
    "select",
    "border border-gray-300 rounded px-4 py-2",
    ""
  );

  // Tambahkan opsi filter kategori
  const categories = ["Semua", "Religious", "Nature", "History"];
  categories.forEach((category) => {
    const option = createEl("option", "", category);
    option.value = category;
    filterSelect.append(option);
  });

  filterContainer.append(filterSelect);
  container.append(filterContainer);

  const grid = createEl(
    "div",
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  );

  // Ambil data dari backend dengan fallback ke data lokal jika server tidak tersedia
  let allData = [];
  try {
    const res = await fetch(apiConfig.url, { timeout: 3000 });
    const json = await res.json();
    allData = json.data.destinasi;
  } catch (error) {
    console.warn("Failed to fetch from API, using fallback data", error);
    allData = apiConfig.fallbackData;
    
    // Show a non-blocking notification that we're using fallback data
    const notification = createEl(
      "div", 
      "fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md max-w-md z-50 animate-fadeIn"
    );
    notification.innerHTML = `
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 10.32 10.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p class="font-bold">Info</p>
          <p class="text-sm">Menggunakan data lokal karena server tidak tersedia.</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.add('animate-fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  let filteredData = allData; // Data yang difilter
  let visibleCount = 3; // Jumlah card yang ditampilkan

  // Fungsi untuk merender card destinasi
  const renderCards = () => {
    grid.innerHTML = ""; // Kosongkan grid sebelum render ulang
    const dataToShow = filteredData.slice(0, visibleCount); // Ambil data sesuai jumlah yang ditampilkan

    dataToShow.forEach((item) => {
      grid.append(cardItem(item));
    });

    // Tampilkan atau sembunyikan tombol "Lihat Lebih Banyak"
    if (visibleCount >= filteredData.length) {
      loadMoreBtn.classList.add("hidden");
    } else {
      loadMoreBtn.classList.remove("hidden");
    }
  };

  // Event listener untuk filter kategori
  filterSelect.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "Semua") {
      filteredData = allData; // Tampilkan semua data
    } else {
      filteredData = allData.filter(
        (item) => item.Category === selectedCategory
      );
    }
    visibleCount = 3; // Reset jumlah card yang ditampilkan
    renderCards(); // Render ulang card
  });

  // Tombol "Lihat Lebih Banyak"
  const loadMoreBtn = createEl(
    "button",
    "mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition",
    "Lihat Lebih Banyak"
  );

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 3; // Tambah jumlah card yang ditampilkan
    renderCards(); // Render ulang card
  });

  container.append(grid, loadMoreBtn);
  section.append(container);

  renderCards(); // Render card pertama kali

  // Tambahkan animasi GSAP untuk card
  const cards = document.querySelectorAll(".card");
  gsap.from(cards, {
    scrollTrigger: {
      trigger: ".card",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
  });

  return section;
};

// ================= header section (judul & deskripsi singkat) =================
const headerContent = () => {
  const wrap = createEl("div", "text-center mb-10");
  const h2 = createEl(
    "h2",
    "text-3xl md:text-4xl font-bold text-gray-800 mb-3",
    "Destinasi Unggulan"
  );
  const p = createEl(
    "p",
    "text-gray-600 max-w-xl mx-auto",
    "Temukan lokasi-lokasi paling menakjubkan di Indonesia melalui pengalaman virtual yang imersif."
  );
  wrap.append(h2, p);
  return wrap;
};

// ================= card per destinasi =================
const cardItem = (data) => {
  const { Name, Province, Regency, Category, Description, images } = data;

  const card = createEl(
    "div",
    "relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-white min-h-[360px] flex flex-col justify-end group"
  );

  // Gunakan gambar pertama dari array `images`, atau gambar default jika kosong
  const imageUrl = images && images.length > 0 ? images[0] : "https://via.placeholder.com/300";
  card.style.backgroundImage = `url('${imageUrl}')`;
  card.style.backgroundSize = "cover";
  card.style.backgroundPosition = "center";

  // overlay gelap biar teks kebaca
  const overlay = createEl(
    "div",
    "bg-gradient-to-t from-black/80 via-black/50 to-transparent h-full w-full p-5 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90 group-hover:via-black/70"
  );

  // kategori destinasi (misal: pantai, gunung, dll)
  const genre = createEl(
    "div",
    "mt-auto text-xs md:text-sm font-semibold mb-2"
  );
  const span = createEl(
    "span",
    "bg-[#E94F37] px-3 md:px-4 py-1 rounded-full inline-block",
    Category
  );
  genre.append(span);

  // judul + lokasi + deskripsi singkat
  const h3 = createEl(
    "h3",
    "text-xl md:text-2xl font-bold leading-tight mb-1",
    Name
  );
  const loc = createEl("p", "text-sm mb-1", `${Regency}, ${Province}`);
  const desc = createEl("p", "text-xs mb-3", Description);

  // =============== tombol buat ke detail destinasi ===============
  const btn = createEl(
    "button",
    "bg-blue-600/90 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg w-fit hover:cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
    "Explore Destination"
  );

  btn.setAttribute("data-id", data.ID);

  // pas diklik, langsung redirect ke detail (dengan query param id)
  btn.addEventListener("click", (e) => {
    const destinationId = e.target.getAttribute("data-id");
    if (destinationId) {
      window.location.href = `?id=${destinationId}`;
    } else {
      alert("ID destinasi tidak valid.");
    }
  });

  // masukin semua ke overlay, terus overlay ke card
  overlay.append(genre, h3, loc, desc, btn);
  card.append(overlay);

  return card;
};

export default section2;
