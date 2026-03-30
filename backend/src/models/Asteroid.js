class Asteroid {
  constructor(a) {
    this.id = a.id;
    this.name = a.name;
    this.hazardous = a.is_potentially_hazardous_asteroid;
    this.diameter =
      a.estimated_diameter.meters.estimated_diameter_max;

    this.speed =
      a.close_approach_data[0]?.relative_velocity.kilometers_per_hour;

    this.missDistance =
      a.close_approach_data[0]?.miss_distance.kilometers;
  }

  get isDangerous() {
    return this.hazardous && this.diameter > 100;
  }
}



module.exports = Asteroid;