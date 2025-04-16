const destinationsController = require('../controllers/destinationsController');

module.exports = [
  {
    method: 'GET',
    path: '/destinasi',
    handler: destinationsController.getDestinations,
  },
  {
    method: 'GET',
    path: '/destinasi/{id}',
    handler: destinationsController.getDestinationById,
  },
  {
    method: 'GET',
    path: '/destinasi/{id}/recommendations',
    handler: destinationsController.getRecommendations,
  },
];