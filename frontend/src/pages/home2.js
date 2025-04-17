import home2Section1 from '../components/home2Section1.js';
import sectionDetail from '../components/sectionDetail.js';
import sectionRecommendations from '../components/sectionRecommendations.js';
import page404 from './page404.js';

const home2 = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  if (!id) {
    return page404(); // Tampilkan halaman 404 jika id tidak ditemukan
  }

  const dataa = await getAPi(id);

  if (dataa && dataa.status === 'success') {
    const div = document.createElement('div');
    div.append(
      home2Section1(dataa.data),
      sectionDetail(dataa.data),
      await sectionRecommendations(id)
    );
    return div;
  } else {
    return page404();
  }
};

const getAPi = async (id) => {
  try {
    const url = 'http://localhost:9000/destinasi';
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export default home2;
