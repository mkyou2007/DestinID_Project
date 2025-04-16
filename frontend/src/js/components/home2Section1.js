// fungsi untuk membuat section utama di detail destinasi bagian atas
const home2Section1 = (data) => {
  const section = document.createElement("section");

  const div = document.createElement("div");
  div.className = `w-full h-80 md:h-[32rem] flex flex-col justify-center items-center text-center gap-5 p-4 md:p-8`;

  // Gunakan gambar pertama dari array `images`, atau gambar default jika kosong
  const imageUrl = data.images && data.images.length > 0 ? data.images[0] : "https://via.placeholder.com/300";
  div.style.backgroundImage = `url('${imageUrl}')`;
  div.style.backgroundSize = "cover";
  div.style.backgroundPosition = "center";

  const title = document.createElement("h1");
  title.className =
    "text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow";
  title.textContent = `${data.Name}`;

  const button = document.createElement("button");
  button.className =
    "bg-white text-black px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:bg-gray-200 transition hover:cursor-pointer";
  button.textContent = "View 360";

  // Event listener untuk membuka halaman panorama
  button.addEventListener("click", () => {
    if (data.StreetViewCoordinates) {
      const { lat, lng } = data.StreetViewCoordinates;
      // Buka halaman panorama dengan parameter latitude dan longitude
      window.open(`panorama.html?lat=${lat}&lng=${lng}`, "_blank");
    } else {
      Swal.fire({
        title: "Fitur Tidak Tersedia",
        text: "Street View untuk destinasi ini belum tersedia.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  });

  div.append(title, button);
  section.append(div);

  return section;
};

export default home2Section1;
