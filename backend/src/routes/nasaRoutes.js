const express = require('express');
const router = express.Router();

const controller = require('../controllers/nasaController');

router.get('/apod', controller.fetchAPOD);
router.get('/mars', controller.fetchMarsPhotos);
router.get('/neo', controller.fetchNEO);
router.get('/search', controller.searchNASAImages);

module.exports = router;