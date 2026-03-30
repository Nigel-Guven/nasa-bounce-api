const nasaService = require('../services/nasaService');

// APOD
exports.fetchAPOD = async (req, res, next) => {
  try {
    const data = await nasaService.getAPOD();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Mars
exports.fetchMarsPhotos = async (req, res, next) => {
  try {
    const { rover = 'curiosity', date = '2026-01-01' } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const photos = await nasaService.getMarsPhotos(rover, date);

    res.json(photos);
  } catch (err) {
    next(err);
  }
};

// NEO
exports.fetchNEO = async (req, res, next) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: 'Start and end dates required' });
    }

    const data = await nasaService.getNEO(start, end);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Search
exports.searchNASAImages = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const results = await nasaService.searchImages(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
};