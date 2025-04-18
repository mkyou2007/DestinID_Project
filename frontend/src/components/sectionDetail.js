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

// ===== Helper Function - createEl =====
// Fungsi ini digunakan untuk membuat elemen HTML dengan tag tertentu, kelas CSS, dan teks konten.
const createEl = (tag, className = "", text = "") => {
  const el = document.createElement(tag); // Membuat elemen HTML baru
  if (className) el.className = className; // Menambahkan kelas CSS jika diberikan
  if (text) el.textContent = text; // Menambahkan teks konten jika diberikan
  return el; // Mengembalikan elemen yang sudah dibuat
};

// ===== Section Peninggalan =====
// Fungsi untuk membuat bagian yang menampilkan peninggalan sejarah suatu destinasi
const sectionPeninggalan = (data) => {
  const wrap = createEl("div", "mt-12"); // Membuat div pembungkus dengan margin atas

  // Membuat judul untuk section Peninggalan
  const title = createEl(
    "h2",
    "text-xl md:text-2xl lg:text-4xl font-semibold text-primary mb-6",
    `Peninggalan ${data.Name}`
  );

  // Membuat grid untuk menampilkan peninggalan dalam bentuk kolom
  const grid = createEl(
    "div",
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  );

  // Daftar peninggalan yang akan ditampilkan - gunakan dummy data jika tidak ada data asli
  const peninggalanList = Array.isArray(data.peninggalan) && data.peninggalan.length > 0 
    ? data.peninggalan 
    : [
        { name: "Artefak Sejarah", desc: "Peninggalan bersejarah dari masa lalu destinasi ini.", image: "https://www.blibli.com/friends-backend/wp-content/uploads/2021/11/Oleh-Oleh-Khas-Indonesia.jpg" },
        { name: "Prasasti Kuno", desc: "Tulisan kuno yang menggambarkan sejarah tempat ini.", image: "https://ik.imagekit.io/tvlk/blog/2023/02/souvenirs_shutterstock_777729133-Copy.jpg" },
        { name: "Monumen Bersejarah", desc: "Simbol penting dari peristiwa bersejarah di lokasi ini.", image: "https://bobobox.com/blog/wp-content//uploads/2023/11/Kopi-Luwak.webp" },
        { name: "Struktur Bangunan", desc: "Bentuk arsitektur khas yang mencerminkan budaya lokal.", image: "https://eventkampus.com/data/artikel/0/952/foto-10-oleh-oleh-khas-indonesia-yang-paling-diminati-wisatawan-mancanegara.jpg" },
      ];

  // Loop untuk menampilkan setiap item peninggalan
  peninggalanList.forEach((item) => {
    const card = createEl(
      "div",
      "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[300px]"
    );

    // Bagian gambar
    const imgContainer = createEl("div", "h-[180px] overflow-hidden");
    const img = createEl("img", "w-full h-full object-cover transition-transform duration-500 hover:scale-110");
    img.src = item.image || "https://via.placeholder.com/300x180?text=No+Image";
    img.alt = item.name;
    imgContainer.appendChild(img);

    // Bagian konten
    const content = createEl("div", "p-4 flex flex-col flex-grow");
    const name = createEl("h3", "text-lg font-bold text-primary mb-1 line-clamp-1", item.name);
    const desc = createEl("p", "text-sm text-gray-600 line-clamp-3", item.desc);

    content.append(name, desc);
    card.append(imgContainer, content);
    grid.appendChild(card);
  });

  wrap.append(title, grid); // Menambahkan judul dan grid ke dalam wrapper
  return wrap; // Mengembalikan wrapper yang berisi section peninggalan
};

// ===== Section UMKM =====
// Fungsi untuk membuat bagian yang menampilkan UMKM di sekitar destinasi
const sectionUmkm = (data) => {
  const section = createEl("div", "mt-12");
  const title = createEl(
    "h2",
    "text-xl md:text-2xl lg:text-4xl font-semibold text-primary mb-6",
    `UMKM di Sekitar Destinasi ${data.Name}`
  );

  const container = createEl(
    "div",
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
  );

  // Validate and process UMKM data
  let umkmList = [];
  if (Array.isArray(data.umkm) && data.umkm.length > 0) {
    umkmList = data.umkm;
  } else {
    // Dummy data when no UMKM data available
    umkmList = [
      { 
        name: "Warung Kuliner Lokal", 
        desc: "Menyajikan berbagai masakan khas daerah dengan cita rasa otentik.", 
        image: "https://www.blibli.com/friends-backend/wp-content/uploads/2021/11/Oleh-Oleh-Khas-Indonesia.jpg" 
      },
      { 
        name: "Toko Souvenir", 
        desc: "Menjual berbagai oleh-oleh dan kerajinan tangan khas daerah setempat.", 
        image: "https://ik.imagekit.io/tvlk/blog/2023/02/souvenirs_shutterstock_777729133-Copy.jpg" 
      },
      { 
        name: "Kafe Tematik", 
        desc: "Tempat santai menikmati kopi dan makanan dengan tema budaya lokal.", 
        image: "https://bobobox.com/blog/wp-content//uploads/2023/11/Kopi-Luwak.webp" 
      }
    ];
  }

  umkmList.forEach((umkm) => {
    const card = createEl(
      "div",
      "bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
    );

    // Image container with hover effect
    const imageContainer = createEl("div", "h-48 overflow-hidden relative");
    const image = createEl("img", "w-full h-full object-cover transition-transform duration-500 hover:scale-110");
    image.src = umkm.image || "https://via.placeholder.com/400x300?text=UMKM";
    image.alt = umkm.name;
    imageContainer.appendChild(image);

    // Content container
    const cardContent = createEl("div", "p-5");
    
    // Title with line clamp for consistency
    const cardTitle = createEl(
      "h3",
      "text-lg font-bold text-primary mb-2 line-clamp-1",
      umkm.name
    );
    
    // Description with line clamp to keep cards consistent height
    const description = createEl(
      "p", 
      "text-sm text-gray-600 line-clamp-3", 
      umkm.desc
    );

    // Button/link element
    const linkContainer = createEl("div", "mt-4");
    const link = createEl(
      "button",
      "px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/80 transition-colors",
      "Kunjungi"
    );
    linkContainer.appendChild(link);

    cardContent.append(cardTitle, description, linkContainer);
    card.append(imageContainer, cardContent);
    container.appendChild(card);
  });

  section.append(title, container);
  return section;
};

// ===== Section Detail Destinasi =====
// Fungsi utama untuk menampilkan detail destinasi lengkap
const sectionDetail = (data) => {
  const section = createEl("section", "mt-8 p-2 lg:pt-12 lg:px-16");

  // Membuat grid dengan 2 kolom untuk layout bagian detail
  const gridContainer = createEl(
    "div",
    "md:grid md:grid-cols-2 md:gap-8 min-w-[200px]"
  );

  const leftCol = createEl("div");
  // Menambahkan judul destinasi
  const title = createEl(
    "h2",
    "font-semibold text-xl text-primary md:text-2xl lg:text-4xl",
    data.Name
  );
  // Menambahkan deskripsi destinasi
  const desc = createEl("p", "text-base text-paragraf mt-4", data.Description);
  leftCol.append(title, desc); // Menambahkan title dan description ke kolom kiri

  // Kolom kanan untuk informasi detail destinasi
  const rightCol = createEl("div", "mt-12 md:mt-0");
  const infoTitle = createEl(
    "h3",
    "font-semibold text-xl text-second lg:text-2xl",
    "Informasi Destinasi"
  );

  const infoBox = createEl(
    "div",
    "w-full bg-[#1D3C34] rounded-xl text-white px-6 py-8 mt-4 lg:w-[90%] lg:mx-0 lg:px-8"
  );

  const infoGrid = createEl("div", "grid gap-4 lg:grid-cols-2");

  // Data informasi destinasi
  const infoData = [
    { label: "Lokasi:", text: `${data.Regency}, ${data.Province}` },
    { label: "Jam Buka:", text: "24 Jam" },
    {
      label: "Tiket Masuk:",
      text: data.Price === "0" ? "Gratis" : `Rp${data.Price}`,
    },
    { label: "UMKM Terdekat:", text: data.umkm[0]?.name || "Tidak ada" },
  ];

  // Loop untuk menampilkan setiap data informasi destinasi
  infoData.forEach((item) => {
    const row = createEl("div", "flex flex-col gap-1");
    const label = createEl("p", "font-semibold", item.label);
    const value = createEl("p", "", item.text);
    row.append(label, value); // Menambahkan label dan value ke row
    infoGrid.appendChild(row); // Menambahkan row ke grid
  });

  // Membuat box untuk menampilkan peta lokasi
  const mapBox = createEl(
    "div",
    "w-full h-56 sm:h-72 lg:h-80 rounded-xl mt-6 overflow-hidden border border-white shadow-md"
  );

  const mapIframe = createEl("iframe", "w-full h-full");
  mapIframe.loading = "lazy";
  mapIframe.allowFullscreen = true;
  mapIframe.referrerPolicy = "no-referrer-when-downgrade";
  mapIframe.src = `https://www.google.com/maps?q=${data.Latitude},${data.Longitude}&hl=id&z=15&output=embed`;

  mapBox.appendChild(mapIframe);
  infoGrid.appendChild(mapBox); // Menambahkan peta ke info grid
  infoBox.appendChild(infoGrid); // Menambahkan info grid ke info box
  rightCol.append(infoTitle, infoBox); // Menambahkan info box ke kolom kanan

  // Menambahkan bagian sejarah destinasi
  const sejarahSection = createEl("div", "mt-12");
  const sejarahTitle = createEl(
    "h2",
    "font-semibold text-xl text-primary md:text-2xl lg:text-4xl",
    `Sejarah ${data.Name}`
  );

  // Create flex container for history section with responsive layout
  const sejarahFlex = createEl(
    "div", 
    "flex flex-col lg:flex-row lg:items-start lg:gap-10 mt-6"
  );

  // Create image container with aspect ratio and loading optimization
  const sejarahImgBox = createEl(
    "div",
    "relative w-full aspect-[16/9] lg:w-1/2 rounded-xl overflow-hidden shadow-lg"
  );

  // Create optimized image with lazy loading and error handling
  const sejarahImg = createEl("img", "w-full h-full object-cover transition duration-300");
  sejarahImg.loading = "lazy";
  sejarahImg.src = data.historyImage?.[0] || "https://picsum.photos/800/450?blur=2";
  sejarahImg.alt = `Historical photo of ${data.Name}`;
  sejarahImg.onerror = (e) => {
    e.target.src = "https://picsum.photos/800/450?blur=2";
  };

  // Add image to container with fade-in animation
  sejarahImgBox.appendChild(sejarahImg);
  gsap.from(sejarahImg, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });

  // Create history text with proper typography and fallback
  const sejarahText = createEl(
    "p",
    "text-lg leading-relaxed text-gray-700 mt-6 lg:mt-0 lg:w-1/2",
    data.History?.trim() || "Historical information for this destination is not yet available."
  );

  sejarahFlex.append(sejarahImgBox, sejarahText); // Menambahkan gambar dan teks sejarah ke flex
  sejarahSection.append(sejarahTitle, sejarahFlex); // Menambahkan judul dan konten sejarah ke section

  // Menambahkan bagian peninggalan sejarah
  const peninggalan = sectionPeninggalan(data);

  // Menambahkan section UMKM ke dalam detail destinasi
  const umkmSection = sectionUmkm(data);

  gridContainer.append(leftCol, rightCol); // Menambahkan kolom kiri dan kanan ke dalam grid
  section.append(gridContainer, sejarahSection, peninggalan, umkmSection); // Menambahkan semua section ke dalam satu container

  return section; // Mengembalikan seluruh section destinasi
};

export default sectionDetail;
