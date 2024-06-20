const express = require("express");
const { getWeather, getYesterdayWeather } = require("../controllers/getWeatherController")

const router = express();

router.get("/get-weather", getWeather);
router.get("/get-yesterday-weather", getYesterdayWeather);

module.exports = router;