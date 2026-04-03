import client from './client';

export const getAPOD = async () => {
  const response = await client.get('/apod');
  return response.data;
};