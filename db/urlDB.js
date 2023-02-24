const db = {};

exports.storeUrl = async (longUrl, shortUrl, ...rest) => {
  db[shortUrl] = {
    longUrl,
    creationTime: Date.now(),
    ...rest,
  };
};

exports.retrieveUrl = async (shortUrl) => {
  return db[shortUrl]?.longUrl;
};

exports.retrieveShortUrl = async (longUrl) => {
  for (const [shortUrl, value] of Object.entries(db)) {
    if (value.longUrl === longUrl) {
      return shortUrl;
    }
  }

  return null;
};

exports.retrieveCreationTime = async (shortUrl) => {
  return db[shortUrl]?.creationTime;
};
