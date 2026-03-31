import api from './client';

export const fetchAPOD = () => api.get('/apod');