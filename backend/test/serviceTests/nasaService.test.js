const nasaService = require('../services/nasaService');
const { nasaApi, nasaImageApi } = require('../config/apiClient');
const CacheManager = require('../utils/cacheManager');
const Validators = require('../utils/validators');

jest.mock('../config/apiClient', () => ({
  nasaApi: { get: jest.fn() },
  nasaImageApi: { get: jest.fn() },
}));

jest.mock('../utils/cacheManager');
jest.mock('../utils/validators');

describe('NASA Service', () => {
  let cacheGetMock, cacheSetMock;

  beforeEach(() => {
    cacheGetMock = jest.fn();
    cacheSetMock = jest.fn();

    CacheManager.mockImplementation(() => ({
      get: cacheGetMock,
      set: cacheSetMock
    }));

    jest.clearAllMocks();
  });

  describe('getAPOD', () => {
    it('should return cached data if available', async () => {
      const cachedData = { title: 'Cached APOD' };
      cacheGetMock.mockReturnValue(cachedData);

      const data = await nasaService.getAPOD();

      expect(data).toEqual(cachedData);
      expect(nasaApi.get).not.toHaveBeenCalled();
    });

    it('should fetch from API if not cached', async () => {
      cacheGetMock.mockReturnValue(null);
      const apiResponse = { data: { title: 'APOD' } };
      nasaApi.get.mockResolvedValue(apiResponse);

      const data = await nasaService.getAPOD();

      expect(data.title).toBe('APOD');
      expect(cacheSetMock).toHaveBeenCalledWith('apod', data);
    });

    it('should throw if API fails', async () => {
      cacheGetMock.mockReturnValue(null);
      const error = new Error('API Error');
      nasaApi.get.mockRejectedValue(error);

      await expect(nasaService.getAPOD()).rejects.toThrow('API Error');
    });
  });

  describe('getMarsPhotos', () => {
    it('should validate rover and date', async () => {
      cacheGetMock.mockReturnValue(null);
      nasaApi.get.mockResolvedValue({ data: { photos: [] } });

      await nasaService.getMarsPhotos('curiosity', '2026-01-01');

      expect(Validators.validateRover).toHaveBeenCalledWith('curiosity');
      expect(Validators.validateDate).toHaveBeenCalledWith('2026-01-01');
    });

    it('should return cached data if available', async () => {
      const cached = [{ id: 1 }];
      cacheGetMock.mockReturnValue(cached);

      const data = await nasaService.getMarsPhotos('curiosity', '2026-01-01');
      expect(data).toEqual(cached);
      expect(nasaApi.get).not.toHaveBeenCalled();
    });

    it('should fetch from API and cache results', async () => {
      cacheGetMock.mockReturnValue(null);
      const apiResponse = { data: { photos: [{ id: 1 }] } };
      nasaApi.get.mockResolvedValue(apiResponse);

      const data = await nasaService.getMarsPhotos('curiosity', '2026-01-01');

      expect(data).toHaveLength(1);
      expect(cacheSetMock).toHaveBeenCalled();
    });
  });

  describe('getNEO', () => {
    it('should throw if start or end date missing', async () => {
      await expect(nasaService.getNEO(null, '2026-01-01')).rejects.toThrow(
        'Start and end dates are required'
      );
    });

    it('should fetch data from API and cache it', async () => {
      cacheGetMock.mockReturnValue(null);
      const apiResponse = {
        data: {
          near_earth_objects: {
            '2026-01-01': [{ id: '1' }],
          },
        },
      };
      nasaApi.get.mockResolvedValue(apiResponse);

      const data = await nasaService.getNEO('2026-01-01', '2026-01-02');

      expect(data).toHaveLength(1);
      expect(cacheSetMock).toHaveBeenCalled();
    });
  });

  describe('searchImages', () => {
    it('should throw if query missing', async () => {
      await expect(nasaService.searchImages()).rejects.toThrow('Search query is required');
    });

    it('should return cached data if available', async () => {
      const cached = [{ title: 'Cached Image' }];
      cacheGetMock.mockReturnValue(cached);

      const data = await nasaService.searchImages('mars');

      expect(data).toEqual(cached);
      expect(nasaImageApi.get).not.toHaveBeenCalled();
    });

    it('should fetch from API and cache results', async () => {
      cacheGetMock.mockReturnValue(null);
      const apiResponse = {
        data: { collection: { items: [{ data: [{ title: 'Image' }]], links: [] } } },
      };
      nasaImageApi.get.mockResolvedValue(apiResponse);

      const data = await nasaService.searchImages('mars');

      expect(data).toHaveLength(1);
      expect(data[0].title).toBe('Image');
      expect(cacheSetMock).toHaveBeenCalled();
    });
  });
});