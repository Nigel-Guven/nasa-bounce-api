const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.response?.status || err.status || 500;

  res.status(status).json({
    message: err.message || 'Internal Server Error',
    details: err.response?.data || null
  });
};

module.exports = errorHandler;