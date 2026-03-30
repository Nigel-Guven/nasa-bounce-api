class CacheManager{
  constructor() {
    this.ttl = process.env.CACHE_TIMEOUT;
    this.store = new Map();
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    const { data, expires } = entry;
    if (Date.now() > expires) {
      this.store.delete(key);
      return null;
    }

    return data;
  }

  set(key, data) {
    this.store.set(key, {
      data,
      expires: Date.now() + this.ttl
    });
  }

  delete(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

module.exports = CacheManager;