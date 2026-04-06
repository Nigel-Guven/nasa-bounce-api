const axios = require('axios');

const nasaApi = axios.create({
  baseURL: process.env.BASE_NASA_URL || 'https://api.nasa.gov',
  timeout: Number(process.env.CLIENT_TIMEOUT) || 5000,
  params: { api_key: process.env.NASA_API_KEY }
});

nasaApi.interceptors.request.use(req => {
  console.log('🚀 NASA API Request:', req.method.toUpperCase(), req.baseURL + req.url);
  console.log('Params:', req.params);
  return req;
});

nasaApi.interceptors.response.use(
  res => {
    console.log('✅ NASA API Response:', res.status, res.statusText);
    return res;
  },
  err => {
    console.error('❌ NASA API Error:', err.message);
    return Promise.reject(err);
  }
);

const nasaImageApi = axios.create({
  baseURL: process.env.BASE_NASA_IMAGE_URL || 'https://images-api.nasa.gov',
  timeout: Number(process.env.CLIENT_TIMEOUT) || 5000
});

module.exports = { nasaApi, nasaImageApi };