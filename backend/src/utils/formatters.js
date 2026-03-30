const formatAsteroid = (a) => ({
  id: a.id,
  name: a.name,
  hazardous: a.is_potentially_hazardous_asteroid,
  diameter: a.estimated_diameter.meters.estimated_diameter_max
});

module.exports = { formatAsteroid };