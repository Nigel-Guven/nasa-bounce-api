class ApodImage {
  constructor(data) {
    this.title = data.title;
    this.date = data.date;
    this.explanation = data.explanation;
    this.image = data.url;
    this.hdImage = data.hdurl;
  }

  get shortExplanation() {
    return this.explanation.slice(0, 150) + '...';
  }
}

module.exports = ApodImage;