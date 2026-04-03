import client from './client';

export const getMarsPhotos = async (params) => {
  const response = await client.get('/mars', { params });
  return response.data;
};