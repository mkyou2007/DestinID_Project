import sectionAbout from "./components/about.js";
import home2 from "./pages/home2.js";

const destinasi = async () => {
  //  =============== ini mengambil elemen main di html =================
  const main = document.querySelector("main");

  //  ============== mengganti elemen main nya ===================
  main.replaceChildren(await home2(), sectionAbout());
};

export default destinasi;
