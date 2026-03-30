class MarsPhoto {
  constructor(p) {
    this.id = p.id;
    this.img = p.img_src;
    this.camera = p.camera.full_name;
    this.rover = p.rover.name;
    this.date = p.earth_date;
  }
}

module.exports = MarsPhoto;