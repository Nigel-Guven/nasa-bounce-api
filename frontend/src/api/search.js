import client from './client';

export const searchNASA = async (query) => {
  const response = await client.get('/search', {
    params: { q: query },
  });
  return response.data;
};