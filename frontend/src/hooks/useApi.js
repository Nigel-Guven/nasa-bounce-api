import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';

export function useApi(apiFunction, params = null, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const functionName = apiFunction.name || 'unknown_api_call';

      try {
        const result = await apiFunction(params);

        if (isMounted) {
          setData(result);
          
          track('API_Success', { 
            service: functionName,
            timestamp: new Date().toISOString()
          });
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Something went wrong.';
        
        if (isMounted) {
          setError(errorMessage);

          track('API_Error', {
            service: functionName,
            error: errorMessage,
            status: err.response?.status || 'network_error'
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}