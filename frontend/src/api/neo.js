import client from './client';

export const getNEO = async (params) => {
  const response = await client.get('/neo', { params });
  return response.data;
};