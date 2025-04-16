const fs = require('fs');
const path = require('path');
const jsonService = require('../services/jsonService');

exports.readJSON = (fileName) => {
  const filePath = path.join(__dirname, '../data', fileName); // Pastikan path ini benar
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

exports.getDestinations = (request, h) => {
  try {
    const destinations = jsonService.readJSON('data.json');
    return { status: 'success', data: { destinasi: destinations } };
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Failed to fetch destinations' }).code(500);
  }
};

exports.getDestinationById = (request, h) => {
  try {
    const { id } = request.params;
    const destinations = jsonService.readJSON('data.json');
    const destination = destinations.find((dest) => dest.ID === parseInt(id));

    if (!destination) {
      return h.response({ status: 'fail', message: 'Destination not found' }).code(404);
    }

    return { status: 'success', data: destination };
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Failed to fetch destination' }).code(500);
  }
};

exports.getRecommendations = (request, h) => {
  try {
    const { id } = request.params;
    const destinations = jsonService.readJSON('data.json');
    const targetDestination = destinations.find((dest) => dest.ID === parseInt(id));

    if (!targetDestination) {
      return h.response({ status: 'fail', message: 'Destination not found' }).code(404);
    }

    // Hitung kemiripan berdasarkan atribut tertentu
    const recommendations = destinations
      .filter((dest) => dest.ID !== targetDestination.ID) // Jangan rekomendasikan destinasi yang sama
      .map((dest) => {
        const similarityScore = calculateSimilarity(targetDestination, dest);
        return { ...dest, similarityScore };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore) // Urutkan berdasarkan skor kemiripan
      .slice(0, 5); // Ambil 5 destinasi teratas

    return { status: 'success', data: recommendations };
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Failed to fetch recommendations' }).code(500);
  }
};

// Fungsi untuk menghitung skor kemiripan
const calculateSimilarity = (target, candidate) => {
  let score = 0;

  // Tambahkan poin jika kategori sama
  if (target.Category === candidate.Category) score += 3;

  // Tambahkan poin berdasarkan kemiripan harga (semakin dekat, semakin tinggi skornya)
  const priceDifference = Math.abs(target.Price - candidate.Price);
  score += priceDifference === 0 ? 2 : 1 / (priceDifference + 1);

  // Tambahkan poin berdasarkan kemiripan rating
  const ratingDifference = Math.abs(target.Rating - candidate.Rating);
  score += 1 / (ratingDifference + 1);

  return score;
};