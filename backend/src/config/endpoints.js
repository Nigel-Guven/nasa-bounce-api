module.exports = {
  APOD: '/planetary/apod',
  MARS_PHOTOS: (rover) => `/mars-photos/api/v1/rovers/${rover}/photos`,
  NEO_FEED: '/neo/rest/v1/feed',
  IMAGE_SEARCH: '/search'
};