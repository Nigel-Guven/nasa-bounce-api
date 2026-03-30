const Asteroid = require('./Asteroid');

class NEOFeed {
  constructor(date, asteroids) {
    this.date = date;
    this.asteroids = asteroids.map(a => new Asteroid(a));
  }
}

module.exports = NEOFeed;