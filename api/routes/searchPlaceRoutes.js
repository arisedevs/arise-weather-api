const express = require("express");
const { getInitialLocation, getSearchLocation, getLocation, getPhoto } = require("../controllers/searchPlaceController.js")

const router = express.Router();

router.get("/get-initial-location", getInitialLocation);
router.get("/search-location", getSearchLocation);
router.get("/get-location", getLocation);
router.get("/get-photo", getPhoto);

module.exports = router;