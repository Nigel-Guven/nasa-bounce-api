const Validators = require('../../src/utils/validators');

describe('Validators', () => {
  describe('validateRover', () => {
    it('does not throw for valid rover', () => {
      expect(() => Validators.validateRover('Curiosity')).not.toThrow();
      expect(() => Validators.validateRover('opportunity')).not.toThrow();
      expect(() => Validators.validateRover('SPIRIT')).not.toThrow();
    });

    it('throws for invalid rover', () => {
      expect(() => Validators.validateRover('InvalidRover')).toThrow(
        /Invalid rover/
      );
    });
  });

  describe('validateDate', () => {
    it('does not throw for valid date', () => {
      expect(() => Validators.validateDate('2026-03-30')).not.toThrow();
    });

    it('throws if date is missing', () => {
      expect(() => Validators.validateDate()).toThrow('Date is required');
    });

    it('throws if date is invalid', () => {
      expect(() => Validators.validateDate('not-a-date')).toThrow(
        /Invalid date format/
      );
    });
  });

  describe('validateQuery', () => {
    it('does not throw for valid query', () => {
      expect(() => Validators.validateQuery('mars')).not.toThrow();
    });

    it('throws if query is empty', () => {
      expect(() => Validators.validateQuery('')).toThrow(
        /Search query is required/
      );
      expect(() => Validators.validateQuery('   ')).toThrow(
        /Search query is required/
      );
      expect(() => Validators.validateQuery(null)).toThrow(
        /Search query is required/
      );
    });
  });
});