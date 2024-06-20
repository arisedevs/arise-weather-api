const axios = require("axios");

const getWeather = async (req, res) => {
    const { lat, lon } = req.query;
    const openWeatherApi = process.env.OPEN_WEATHER_API_KEY;

    try {

        const response = await axios.get("https://api.openweathermap.org/data/3.0/onecall", {
            params: {
                lat: lat,
                lon: lon,
                units: "metric",
                exclude: "minutely,hourly,alerts",
                appid: openWeatherApi
            }
        });

        res.json(response.data);

    } catch(error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Error in fetching data.");
    }

}

const getYesterdayWeather = async (req, res) => {
    const { lat, lon, dt } = req.query;
    const openWeatherApi = process.env.OPEN_WEATHER_API_KEY;

    try {

        const response = await axios.get("https://api.openweathermap.org/data/3.0/onecall/timemachine", {
            params: {
                lat: lat,
                lon: lon,
                dt: dt,
                units: "metric",
                appid: openWeatherApi
            }
        });

        res.json(response.data);

    } catch(error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Error in fetching data.");
    }

}

module.exports = {
    getWeather,
    getYesterdayWeather
}