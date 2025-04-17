const API_BASE_URL = 'http://localhost:9000';

export const fetchDestinations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinasi`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const fetchDestinationById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinasi/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    throw error;
  }
};

export const fetchRecommendations = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinasi/${id}/recommendations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}; 