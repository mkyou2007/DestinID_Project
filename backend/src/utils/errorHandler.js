exports.handleError = (h, error, message = 'An error occurred') => {
  console.error(error);
  return h.response({ status: 'error', message }).code(500);
};