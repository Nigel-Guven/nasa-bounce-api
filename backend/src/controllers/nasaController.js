const nasaService = require('../services/nasaService');

// APOD
exports.fetchAPOD = async (req, res) => {
  try {
    const data = await nasaService.getAPOD();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch APOD' });
  }
};

// Mars
exports.fetchMarsPhotos = async (req, res) => {
  try {
    const { rover = 'curiosity', date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const photos = await nasaService.getMarsPhotos(rover, date);

    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Mars photos' });
  }
};

// NEO
exports.fetchNEO = async (req, res) => {
  try {
    const { start, end } = req.query;

    const data = await nasaService.getNEO(start, end);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch asteroid data' });
  }
};

// Search
exports.searchNASAImages = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const results = await nasaService.searchImages(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};