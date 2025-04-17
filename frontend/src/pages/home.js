import section1 from "../components/section1.js";
import section2 from "../components/section2.js";

// ================ ini menampung semua kontennya
async function home() {
  const container = document.createElement("div");

  // =========== komponen yang di butuhkan ============
  container.append(section1(), await section2());

  return container;
}

export default home;
