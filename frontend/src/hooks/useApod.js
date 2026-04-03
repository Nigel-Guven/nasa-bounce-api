import { useApi } from './useApi';
import { getAPOD } from '../api';

export function useAPOD() {
  return useApi(getAPOD, null, []);
}