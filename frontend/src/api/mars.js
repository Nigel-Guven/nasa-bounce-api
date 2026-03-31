import api from './client';

export const fetchMarsPhotos = (params) =>
  api.get('/mars', { params });