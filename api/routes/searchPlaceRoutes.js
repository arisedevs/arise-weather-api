const express = require("express");
const { getSearchLocation, getLocation, getPhoto } = require("../controllers/searchPlaceController.js")

const router = express.Router();

router.get("/search-location", getSearchLocation);
router.get("/get-location", getLocation);
router.get("/get-photo", getPhoto);

module.exports = router;