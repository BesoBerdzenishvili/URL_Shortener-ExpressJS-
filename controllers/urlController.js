const db = require("../db/urlDB");
const idGenerator = require("../utils/idGenerator");

exports.generateShortUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({
        message: "Missing required parameter: longUrl",
      });
    }

    const existingShortUrl = await db.retrieveShortUrl(longUrl);

    if (existingShortUrl) {
      return res.status(200).json({
        message: "Short URL already exists for this long URL",
        shortUrl: `${req.protocol}://${req.get("host")}/${
          existingShortUrl.shortUrl
        }`,
        createdAt: existingShortUrl.createdAt,
        expiresAt: existingShortUrl.expiresAt,
      });
    }

    const shortUrl = idGenerator.generateId();
    const createdAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // Set expiration date to 24 hours after creation

    await db.storeUrl(longUrl, shortUrl, createdAt, expiresAt);

    res.status(201).json({
      message: "Short URL generated successfully",
      shortUrl: `${req.protocol}://${req.get("host")}/${shortUrl}`,
      createdAt: createdAt,
      expiresAt: expiresAt,
    });
  } catch (err) {
    next(err);
  }
};

exports.redirectToLongUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const longUrl = await db.retrieveUrl(shortUrl);

    if (!longUrl) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    // Check if URL has expired (e.g., after 30 days)
    const creationTime = await db.retrieveCreationTime(shortUrl);

    if (!creationTime || Date.now() - creationTime > 24 * 60 * 60 * 1000) {
      return res.status(404).json({
        message: "Short URL has expired",
      });
    }

    res.redirect(longUrl);
  } catch (err) {
    next(err);
  }
};
