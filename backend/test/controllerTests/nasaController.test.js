const nasaController = require('../../src/controllers/nasaController');
const nasaService = require('../../src/services/nasaService');

jest.mock('../../src/services/nasaService');

describe('NASA Controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { query: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  // -------------------------
  // Fetch APOD
  // -------------------------
  describe('fetchAPOD', () => {
    it('should return APOD data', async () => {
      const mockData = { title: 'Astronomy Picture', date: '2026-03-30' };
      nasaService.getAPOD.mockResolvedValue(mockData);

      await nasaController.fetchAPOD(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next on service error', async () => {
      const error = new Error('Service failed');
      nasaService.getAPOD.mockRejectedValue(error);

      await nasaController.fetchAPOD(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // -------------------------
  // Fetch Mars Photos
  // -------------------------
  describe('fetchMarsPhotos', () => {
    it('should return photos when date is provided', async () => {
      const mockPhotos = [{ id: 1, img: 'url' }];
      nasaService.getMarsPhotos.mockResolvedValue(mockPhotos);

      req.query = { rover: 'curiosity', date: '2026-01-01' };

      await nasaController.fetchMarsPhotos(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockPhotos);
    });

    it('should use default rover if not provided', async () => {
      const mockPhotos = [{ id: 2, img: 'url2' }];
      nasaService.getMarsPhotos.mockResolvedValue(mockPhotos);

      req.query = { date: '2026-01-01' };

      await nasaController.fetchMarsPhotos(req, res, next);

      expect(nasaService.getMarsPhotos).toHaveBeenCalledWith('curiosity', '2026-01-01');
      expect(res.json).toHaveBeenCalledWith(mockPhotos);
    });

    it('should return 400 if date is missing', async () => {
      req.query = { rover: 'curiosity' };

      await nasaController.fetchMarsPhotos(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Date is required' });
    });

    it('should call next on service error', async () => {
      const error = new Error('Service failed');
      nasaService.getMarsPhotos.mockRejectedValue(error);

      req.query = { rover: 'curiosity', date: '2026-01-01' };

      await nasaController.fetchMarsPhotos(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // -------------------------
  // Fetch NEO
  // -------------------------
  describe('fetchNEO', () => {
    it('should return NEO data when start and end dates are provided', async () => {
      const mockData = [{ date: '2026-03-30', asteroids: [] }];
      nasaService.getNEO.mockResolvedValue(mockData);

      req.query = { start: '2026-03-01', end: '2026-03-05' };

      await nasaController.fetchNEO(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should return 400 if start or end is missing', async () => {
      req.query = { start: '2026-03-01' };

      await nasaController.fetchNEO(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Start and end dates required' });
    });

    it('should call next on service error', async () => {
      const error = new Error('Service failed');
      nasaService.getNEO.mockRejectedValue(error);

      req.query = { start: '2026-03-01', end: '2026-03-05' };

      await nasaController.fetchNEO(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // -------------------------
  // Search NASA Images
  // -------------------------
  describe('searchNASAImages', () => {
    it('should return search results when query is provided', async () => {
      const mockResults = [{ title: 'Mars Image' }];
      nasaService.searchImages.mockResolvedValue(mockResults);

      req.query = { q: 'mars' };

      await nasaController.searchNASAImages(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    it('should return 400 if query is missing', async () => {
      req.query = {};

      await nasaController.searchNASAImages(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Query is required' });
    });

    it('should call next on service error', async () => {
      const error = new Error('Service failed');
      nasaService.searchImages.mockRejectedValue(error);

      req.query = { q: 'mars' };

      await nasaController.searchNASAImages(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});