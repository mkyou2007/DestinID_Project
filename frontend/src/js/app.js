import sectionAbout from "./components/about.js";
import home from "./pages/home.js";

const app = async () => {
  // ========= mengambil elemene main ===========
  const main = document.querySelector("main");

  // =============== ngosongin elemen main =============
  main.innerHTML = "";

  // ============= menambahkan elemen ke main ==============
  main.append(await home(), sectionAbout());
};

export default app;
