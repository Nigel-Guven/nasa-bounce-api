import { useApi } from './useApi';
import { getNEO } from '../api';

export function useNEO(filters) {
  return useApi(getNEO, filters, [JSON.stringify(filters)]);
}