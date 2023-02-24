const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.post("/urls", urlController.generateShortUrl);
router.get("/:shortUrl", urlController.redirectToLongUrl);

module.exports = router;
