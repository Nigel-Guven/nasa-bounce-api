import { useEffect, useState } from 'react';
import { searchNASA } from '../api';

export function useSearch(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setData([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchNASA(query);
        setData(results);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            'Search failed.'
        );
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return { data, loading, error };
}