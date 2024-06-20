const express = require("express");
const router = express.Router();
const {
  getInitialLocation,
  getSearchLocation,
  getLocation,
  getPhoto,
} = require("../controllers/searchPlaceController.js");
const cors = require("cors");

const allowedOrigin = "https://arise-weather-app.vercel.app/";

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

router.get("/get-initial-location", cors(corsOptions), getInitialLocation);
router.get("/search-location", cors(corsOptions), getSearchLocation);
router.get("/get-location", cors(corsOptions), getLocation);
router.get("/get-photo", cors(corsOptions), getPhoto);

module.exports = router;
