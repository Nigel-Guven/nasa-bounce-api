const axios = require('axios');

const BASE_URL = 'https://api.nasa.gov';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: process.env.NASA_API_KEY
  }
});

// APOD
const getAPOD = async () => {
  const res = await api.get('/planetary/apod');
  return res.data;
};

// Mars Rover
const getMarsPhotos = async (rover, date) => {
  const res = await api.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
    params: { earth_date: date }
  });
  return res.data.photos;
};

// Near Earth Objects
const getNEO = async (startDate, endDate) => {
  const res = await api.get('/neo/rest/v1/feed', {
    params: { start_date: startDate, end_date: endDate }
  });
  return res.data;
};

// Image Search
const searchImages = async (query) => {
  const res = await axios.get('https://images-api.nasa.gov/search', {
    params: { q: query }
  });
  return res.data;
};

module.exports = {
  getAPOD,
  getMarsPhotos,
  getNEO,
  searchImages
};