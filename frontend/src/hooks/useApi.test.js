import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi Hook', () => {
  it('should initialize with loading state and null data', () => {
    const mockApi = jest.fn(() => new Promise(() => {}));
    const { result } = renderHook(() => useApi(mockApi));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should return data and set loading to false on success', async () => {
    const mockData = { mission: 'Artemis', status: 'Active' };
    const mockApi = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should return an error message on failure', async () => {
    const mockError = { message: 'Satellite signal lost' };
    const mockApi = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useApi(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Satellite signal lost');
    expect(result.current.data).toBe(null);
  });

  it('should handle nested error messages from axios structure', async () => {
    const axiosError = {
      response: {
        data: { message: 'NASA API Key Invalid' }
      }
    };
    const mockApi = jest.fn().mockRejectedValue(axiosError);

    const { result } = renderHook(() => useApi(mockApi));

    await waitFor(() => {
      expect(result.current.error).toBe('NASA API Key Invalid');
    });
  });

  it('should re-run the effect when dependencies change', async () => {
    const mockApi = jest.fn().mockResolvedValue('Response');

    const { rerender } = renderHook(
      ({ deps }) => useApi(mockApi, null, deps),
      { initialProps: { deps: [1] } }
    );

    await waitFor(() => expect(mockApi).toHaveBeenCalledTimes(1));

    rerender({ deps: [2] });

    await waitFor(() => expect(mockApi).toHaveBeenCalledTimes(2));
  });
});