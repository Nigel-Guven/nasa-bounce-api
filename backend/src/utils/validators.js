const { ROVERS } = require('../config/consts');

class Validators {
  static validateRover(rover) {
    if (!ROVERS.includes(rover.toLowerCase())) {
      throw new Error(`Invalid rover. Must be one of: ${ROVERS.join(', ')}`);
    }
  }

  static validateDate(date) {
    if (!date) throw new Error('Date is required');
    if (isNaN(Date.parse(date))) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }
  }

  static validateQuery(query) {
    if (!query || !query.trim()) {
      throw new Error('Search query is required');
    }
  }
}

module.exports = Validators;