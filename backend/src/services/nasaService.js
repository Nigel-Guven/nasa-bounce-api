const { nasaApi, nasaImageApi } = require('../config/apiClient');
const endpoints = require('../config/endpoints');

const Validators = require('../utils/validators');
const CacheManager = require('../utils/cacheManager');
const cache = new CacheManager(); // 5 min TTL

const ApodImage = require('../models/ApodImage');
const MarsPhoto = require('../models/MarsPhoto');
const NEOFeed = require('../models/NEOFeed');
const NasaImage = require('../models/NasaImage');

const getAPOD = async () => {
  const key = 'apod';
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await nasaApi.get(endpoints.APOD);
  const data = new ApodImage(res.data);

  cache.set(key, data);

  return data;
};

const getMarsPhotos = async (rover = 'curiosity', date) => {
  Validators.validateRover(rover);
  Validators.validateDate(date);

  const key = `mars-${rover}-${date}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await nasaApi.get(
    endpoints.MARS_PHOTOS(rover),
    { params: { earth_date: date } }
  );

  const data = res.data.photos.map(p => new MarsPhoto(p));

  cache.set(key, data);

  return data;
};

const getNEO = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error('Start and end dates are required');
  }

  const key = `neo-${startDate}-${endDate}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await nasaApi.get(endpoints.NEO_FEED, {
    params: { start_date: startDate, end_date: endDate }
  });

  const objects = res.data.near_earth_objects;

  const data = Object.keys(objects).map(
    date => new NEOFeed(date, objects[date])
  );

  cache.set(key, data);

  return data;
};

const searchImages = async (query) => {
  if (!query) {
    throw new Error('Search query is required');
  }

  const key = `search-${query}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await nasaImageApi.get(endpoints.IMAGE_SEARCH, {
    params: { q: query }
  });

  const data = res.data.collection.items.map(
    item => new NasaImage(item)
  );

  cache.set(key, data);

  return data;
};

module.exports = {
  getAPOD,
  getMarsPhotos,
  getNEO,
  searchImages
};