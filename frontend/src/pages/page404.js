const page404 = () => {
  const div = document.createElement("div");
  div.className = "bg-gray-100 flex items-center justify-center min-h-screen";

  const content = `
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600">404</h1>
      <p class="text-2xl text-gray-700 mt-4">Halaman Tidak Ditemukan</p>
      <p class="text-lg text-gray-500 mt-2">Kami tidak dapat menemukan halaman yang Anda cari.</p>
      <button id="go-home" class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
        Kembali ke Beranda
      </button>
    </div>
  `;

  div.innerHTML = content;

  div.querySelector("#go-home").addEventListener("click", function () {
    window.location.href = "/";
  });

  return div;
};

export default page404;
