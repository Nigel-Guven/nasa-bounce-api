const axios = require('axios');

const nasaApi = axios.create({
  baseURL: process.env.BASE_NASA_URL,
  timeout: process.env.CLIENT_TIMEOUT,
  params: {
    api_key: process.env.NASA_API_KEY
  }
});

const nasaImageApi = axios.create({
  baseURL: process.env.BASE_NASA_IMAGE_URL,
  timeout: process.env.CLIENT_TIMEOUT
});

module.exports = {
  nasaApi,
  nasaImageApi
};