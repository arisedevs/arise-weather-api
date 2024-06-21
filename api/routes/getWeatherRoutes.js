const express = require("express");
const router = express.Router();
const {
  getWeather,
  getYesterdayWeather,
} = require("../controllers/getWeatherController");
const cors = require("cors");

const allowedOrigin = "https://ariseweather.vercel.app";

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

router.get("/get-weather", cors(corsOptions), getWeather);
router.get("/get-yesterday-weather", cors(corsOptions), getYesterdayWeather);

module.exports = router;
