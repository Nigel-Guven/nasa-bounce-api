class NasaImage {
  constructor(item) {
    this.title = item.data[0]?.title;
    this.description = item.data[0]?.description;
    this.image = item.links?.[0]?.href;
  }
}

module.exports = NasaImage;