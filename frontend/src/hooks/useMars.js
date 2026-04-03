import { useApi } from './useApi';
import { getMarsPhotos } from '../api';

export function useMars(filters) {
  return useApi(getMarsPhotos, filters, [JSON.stringify(filters)]);
}