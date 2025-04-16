// ============== ini div isi gambar+judul di halaman utama ===============
const section1 = () => {
  const section = document.createElement("section");
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

  return section;
};
export default section1;
