//  ================ ini untuk halaman about ================
const createEl = (tag, className = "", text = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

const sectionAbout = () => {
  const section = createEl("section", "py-16 bg-sand-yellow bg-opacity-20");
  section.id = "about";

  const container = createEl("div", "container mx-auto px-4 md:px-8 lg:px-12");
  section.appendChild(container);

  const flexContainer = createEl("div", "flex flex-col lg:flex-row gap-8 items-center");
  container.appendChild(flexContainer);

  // Main Image
  const imageContainer = createEl("div", "w-full lg:w-2/5");
  const image = createEl("img", "w-full h-auto rounded-lg shadow-lg");
  image.src = "../public/assets/ii.svg";
  image.alt = "Indonesian Mountain Landscape";
  imageContainer.appendChild(image);
  flexContainer.appendChild(imageContainer);

  // Text Content
  const textContainer = createEl("div", "w-full lg:w-3/5");
  const textContent = createEl("div", "mb-6");

  const h3 = createEl("h3", "text-forest-green font-manrope text-xl font-bold mb-1", "Destin");
  const span = createEl("span", "text-sunset-orange", "ID");
  h3.appendChild(span);
  textContent.appendChild(h3);

  const h2 = createEl("h2", "text-3xl md:text-4xl font-manrope font-bold text-gray-800 mb-4", "Destinasi Indonesia");
  textContent.appendChild(h2);

  const paragraph = createEl("p", "font-opensans text-gray-700 mb-6",
    " Indonesia is a country with a rich cultural heritage and stunning natural beauty. From the lush rice terraces of Bali to the majestic mountains of Sumatra, there is something for everyone to explore. Whether you're looking for adventure, relaxation, or a taste of local culture, Indonesia has it all. With its diverse landscapes and vibrant communities, it's no wonder that Indonesia is a top destination for travelers from around the world."
  );
  textContent.appendChild(paragraph);
  textContainer.appendChild(textContent);
  flexContainer.appendChild(textContainer);

  return section;

};

export default sectionAbout;
