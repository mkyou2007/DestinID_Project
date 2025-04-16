import app from "./js/app.js";
import destinasi from "./js/destinasi.js";

window.addEventListener("DOMContentLoaded", () => {
  //  ================ parameter url ================
  const urlParams = new URLSearchParams(window.location.search);

  // ================ mengambil id di url ===================
  const destinationId = urlParams.get("id");
  if (destinationId) {
    // ============ halaman detail destinasi ==================
    destinasi();
  } else {
    // ============ halaman home =================
    app();
  }
});
