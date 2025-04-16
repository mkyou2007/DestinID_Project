const sectionRecommendations = async (id) => {
  const section = document.createElement('section');
  section.className = 'mt-12';

  const title = document.createElement('h2');
  title.className = 'text-xl md:text-2xl lg:text-4xl font-semibold text-primary mb-6 text-center';
  title.textContent = 'Rekomendasi Destinasi Mirip';

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  // Ambil rekomendasi dari backend
  try {
    const res = await fetch(`http://localhost:9000/destinasi/${id}/recommendations`);
    const json = await res.json();

    if (json.status === 'success') {
      json.data.forEach((item) => {
        grid.appendChild(cardItem(item));
      });
    } else {
      const errorText = document.createElement('p');
      errorText.textContent = 'Tidak ada rekomendasi yang tersedia.';
      grid.appendChild(errorText);
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }

  section.append(title, grid);
  return section;
};

// Fungsi untuk membuat card destinasi
const cardItem = (data) => {
    const { Name, Province, Regency, Description, images } = data;

    const card = document.createElement('div');
    card.className =
        'relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-all text-white min-h-[240px] flex flex-col justify-end';

    const imageUrl = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300';
    card.style.backgroundImage = `url('${imageUrl}')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';

    const overlay = document.createElement('div');
    overlay.className =
        'bg-gradient-to-t from-black/60 via-black/30 to-transparent h-full w-full p-4 flex flex-col justify-end';

    const h3 = document.createElement('h3');
    h3.className = 'text-lg md:text-xl font-bold leading-tight mb-1';
    h3.textContent = Name;

    const loc = document.createElement('p');
    loc.className = 'text-sm mb-1';
    loc.textContent = `${Regency}, ${Province}`;

    const desc = document.createElement('p');
    desc.className = 'text-xs mb-2';
    desc.textContent = Description;

    const button = document.createElement('button');
    button.className =
        'bg-primary text-white text-sm font-medium py-1 px-3 rounded hover:bg-primary-dark transition-all';
    button.textContent = 'Lihat Detail';
    button.setAttribute("data-id", data.ID);

    // pas diklik, langsung redirect ke detail (dengan query param id)
    button.addEventListener("click", (e) => {
      const destinationId = e.target.getAttribute("data-id");
      if (destinationId) {
        window.location.href = `?id=${destinationId}`;
      } else {
        alert("ID destinasi tidak valid.");
      }
    });
  

    overlay.append(h3, loc, desc, button);
    card.append(overlay);

    return card;
};

export default sectionRecommendations;