jest.mock('../../src/config/apiClient', () => ({
  nasaApi: { get: jest.fn() },
  nasaImageApi: { get: jest.fn() },
}));

jest.mock('../../src/utils/cacheManager');
jest.mock('../../src/utils/validators');

const { nasaApi, nasaImageApi } = require('../../src/config/apiClient');
const CacheManager = require('../../src/utils/cacheManager');
const Validators = require('../../src/utils/validators');

const nasaService = require('../../src/services/nasaService');

describe('NASA Service', () => {
  let cacheGetMock, cacheSetMock;

  beforeEach(() => {
    // Reset mocks
    cacheGetMock = jest.fn();
    cacheSetMock = jest.fn();

    CacheManager.mockImplementation(() => ({
      get: cacheGetMock,
      set: cacheSetMock,
    }));

    jest.clearAllMocks();
  });

  // -------------------------
  // getAPOD
  // -------------------------
  describe('getAPOD', () => {
    it('throws if API fails', async () => {
      cacheGetMock.mockReturnValue(null);
      const error = new Error('API Error');
      nasaApi.get.mockRejectedValue(error);

      await expect(nasaService.getAPOD()).rejects.toThrow('API Error');
    });
  });

  // -------------------------
  // getMarsPhotos
  // -------------------------
  describe('getMarsPhotos', () => {
    const rover = 'curiosity';
    const date = '2026-01-01';

    it('validates rover and date', async () => {
      cacheGetMock.mockReturnValue(null);
      nasaApi.get.mockResolvedValue({ data: { photos: [] } });

      await nasaService.getMarsPhotos(rover, date);

      expect(Validators.validateRover).toHaveBeenCalledWith(rover);
      expect(Validators.validateDate).toHaveBeenCalledWith(date);
    });
  });

  // -------------------------
  // getNEO
  // -------------------------
  describe('getNEO', () => {
    const start = '2026-01-01';
    const end = '2026-01-02';

    it('throws if start or end date missing', async () => {
      await expect(nasaService.getNEO(null, end)).rejects.toThrow('Start and end dates are required');
      await expect(nasaService.getNEO(start, null)).rejects.toThrow('Start and end dates are required');
    });
  });

  // -------------------------
  // searchImages
  // -------------------------
  describe('searchImages', () => {
    const query = 'mars';

    it('throws if query is missing', async () => {
        await expect(nasaService.searchImages()).rejects.toThrow('Search query is required');
    });
  });
});