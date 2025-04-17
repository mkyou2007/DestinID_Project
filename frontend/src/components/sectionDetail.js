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

  // Daftar peninggalan yang akan ditampilkan (data bisa kosong, maka menggunakan default dummy data)
  const peninggalanList = data.peninggalan || [
    // Tambah data dummy lainnya
    { name: "tas amikan", desc: "dibuat dengan tulus oleh ibu.", image: "https://www.blibli.com/friends-backend/wp-content/uploads/2021/11/Oleh-Oleh-Khas-Indonesia.jpg" },
    { name: "talenan kayu", desc: "khas dari suku dayak.", image: "https://ik.imagekit.io/tvlk/blog/2023/02/souvenirs_shutterstock_777729133-Copy.jpg" },
    { name: "kopi luwak", desc: "Candi utama.", image: "https://bobobox.com/blog/wp-content//uploads/2023/11/Kopi-Luwak.webp" },
    { name: "Candi Utama", desc: "Candi utama.", image: "https://eventkampus.com/data/artikel/0/952/foto-10-oleh-oleh-khas-indonesia-yang-paling-diminati-wisatawan-mancanegara.jpg" },
  ];

  // Loop untuk menampilkan setiap item peninggalan
  peninggalanList.forEach((item) => {
    const card = createEl(
      "div",
      "relative rounded-xl overflow-hidden shadow hover:shadow-xl transition-all text-white min-h-[300px] flex flex-col justify-end"
    );
    if (item.image) {
      card.style.backgroundImage = `url('${item.image}')`; // Menambahkan gambar background jika ada
    } else {
      card.classList.add("bg-gradient-to-tr", "from-slate-600", "to-slate-400"); // Menambahkan background gradient jika tidak ada gambar
    }

    // Overlay untuk memberi efek di atas gambar
    const overlay = createEl(
      "div",
      "bg-gradient-to-t from-black/60 via-black/30 to-transparent h-full w-full p-5 flex flex-col justify-end"
    );

    // Judul dan deskripsi peninggalan
    const h3 = createEl("h3", "text-lg md:text-xl font-bold mb-1", item.name);
    const desc = createEl("p", "text-sm", item.desc);
    overlay.append(h3, desc); // Menambahkan judul dan deskripsi ke overlay
    card.append(overlay); // Menambahkan overlay ke dalam card
    grid.append(card); // Menambahkan card ke dalam grid
  });

  wrap.append(title, grid); // Menambahkan judul dan grid ke dalam wrapper
  return wrap; // Mengembalikan wrapper yang berisi section peninggalan
};

// ===== Section UMKM =====
// Fungsi untuk membuat bagian yang menampilkan UMKM di sekitar destinasi
const sectionUmkm = (data) => {
  const umkmList = data.umkm || []; // Gunakan array kosong jika `umkm` tidak ada
  if (!Array.isArray(umkmList)) {
    console.error("UMKM data is not an array:", umkmList);
    return document.createElement("div"); // Kembalikan elemen kosong jika data tidak valid
  }

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
  umkmList.forEach((umkm) => {
    const card = createEl(
      "div",
      "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    );

    const image = createEl("img", "w-full h-40 object-cover");
    image.src = umkm.image || "https://via.placeholder.com/150"; // Default image if none provided
    image.alt = umkm.name;

    const cardContent = createEl("div", "p-5");
    const title = createEl(
      "h3",
      "text-lg font-semibold text-primary mb-2",
      umkm.name
    );
    const description = createEl("p", "text-sm text-gray-600", umkm.desc);

    card.appendChild(image); // Add the image to the card

    cardContent.append(title, description);
    card.append(cardContent);
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

  const sejarahFlex = createEl("div", "lg:flex lg:gap-10");

  // Menampilkan gambar sejarah destinasi
  const sejarahImgBox = createEl(
    "div",
    "w-full h-56 my-3 rounded-xl overflow-hidden lg:w-1/2 lg:h-80"
  );
  const sejarahImg = createEl("img", "w-full h-full object-cover");
  sejarahImg.src = data.historyImage || "https://picsum.photos/200/300";
  sejarahImg.alt = data.Name;
  sejarahImgBox.appendChild(sejarahImg);

  const sejarahText = createEl(
    "p",
    "text-lg text-paragraf lg:mt-8 font-medium",
    data.History !== "-"
      ? data.History
      : "Sejarah destinasi ini belum tersedia."
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
